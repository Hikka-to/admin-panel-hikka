"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableColumn, TableHeader } from "@heroui/table";
import {
  getKeyValue,
  Pagination,
  SlotsToClasses,
  SortDescriptor,
  Spinner,
  TableCell,
  TableRow,
  TableSlots,
  Tooltip,
} from "@heroui/react";
import { Chip } from "@heroui/chip";
import { LoadingState } from "@react-types/shared";
import { Icon } from "@iconify-icon/react";
import { DeleteIcon, EyeIcon } from "@heroui/shared-icons";
import { ZodBoolean, ZodDate, ZodError, ZodNumber, ZodString } from "zod";

import { ModelDto } from "@/models/Shared/model-dto";
import { CrudService } from "@/service/shared/CrudService";
import useSearchParam from "@/hooks/useSearchParam";
import { ReturnPageDto } from "@/models/Shared/return-page-dto";
import { ColumnInfos } from "@/types/table/ColumnInfo";
import { toPascalCase, toTitleCase } from "@/utils/TextUtils";
import { useAuth, useAuthService } from "@/hooks/auth";
import { SortOrder } from "@/models/Dto/SharedDtos/sort-order";
import TransparentInput from "@/components/inputs/TransparentInput";
import { filterPaginationDtoSchema } from "@/models/Dto/SharedDtos/filter-pagination-dto";
import useDebounceState from "@/hooks/useDebounceState";

import ButtonForOpenUpdateSeoAdditionModalWindowInTable from "../shared/models-windows/seoAddition/update/ButtonForOpenUpdateSeoAdditionModalWindowInTable";
import ReturnButtonForOpenUpdateWindowFunction from "@/types/model-windows/buttons/update-buttons/ReturnButtonForOpenUpdateWindowFunction";
import ReturnButtonForOpenCreateWindowFunction from "@/types/model-windows/buttons/create-buttons/ReturnButtonForOpenCreateWindowFunction";
import ReturnButtonForOpenViewDetailWindowFunction from "@/types/model-windows/buttons/view-details-buttons/ReturnButtonForOpenViewDetailWindowFunction";
import RenderFunction from "@/types/table/RenderFunction";
import useGetPageOfItems from "@/hooks/useGetPageOfItems";

const classNames: SlotsToClasses<TableSlots> = {
  wrapper: [
    "bg-background/60",
    "dark:bg-default-100/50",
    "backdrop-blur-md",
    "backdrop-saturate-150",
    "h-full"
  ],
  th: [
    "bg-background/30",
    "dark:bg-default-100/40",
    "backdrop-blur-md",
    "backdrop-saturate-150"
  ]
};

const accessibleNameTypes = {
  string: ZodString,
  number: ZodNumber,
  boolean: ZodBoolean,
  date: ZodDate
};

const accessibleTypes = Object.values(accessibleNameTypes);

type AccessibleTypeNames = keyof typeof accessibleNameTypes;
type AccessibleTypes = InstanceType<typeof accessibleNameTypes[AccessibleTypeNames]>;

const transforms: Partial<Record<AccessibleTypeNames, (value: any) => React.ReactNode>> = {
  boolean: (value) => (
    <Chip color={value ? "success" : "danger"}>
      {value ? "True" : "False"}
    </Chip>
  ),
  date: (value: Date) => value.toLocaleString()
};

export interface ModelTableProps<TGetModelDto extends ModelDto> {
  service: CrudService<TGetModelDto, object, ModelDto>;
  columnHeaders?: ColumnInfos<TGetModelDto>;
  createButton: ReturnButtonForOpenCreateWindowFunction<CrudService<ModelDto, object, ModelDto>>;
  updateButton: ReturnButtonForOpenUpdateWindowFunction<TGetModelDto, CrudService<TGetModelDto, object, ModelDto>>;
  viewDetailButton: ReturnButtonForOpenViewDetailWindowFunction<TGetModelDto>;
  displayColumnsMap: Map<string, RenderFunction>;
  dontAllowSort: string[];
  accessibleColumns: string[];
}

const ModelTable = <TGetModelDto extends ModelDto>
  ({
    service,
    columnHeaders,
    createButton,
    updateButton,
    viewDetailButton,
    displayColumnsMap,
    accessibleColumns,
    dontAllowSort }: ModelTableProps<TGetModelDto>) => {
  const status = useAuthService(service);
  const [page, setPage] = useSearchParam("page");
  const [perPage, setPerPage] = useSearchParam("perPage");
  const [perPageState, setPerPageState] = useDebounceState(perPage, setPerPage, 500);
  const [items, setItems] = useState<ReturnPageDto<TGetModelDto>>();
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const [error, setError] = useState<string>();
  const [perPageError, setPerPageError] = useState<string>();
  const perPageMin = filterPaginationDtoSchema.shape.pageSize.minValue;
  const perPageMax = filterPaginationDtoSchema.shape.pageSize.maxValue;

  const getDtoSchema = service.getDtoSchema;

  const columns = Object.entries(getDtoSchema.shape)
    .filter(([key, value]) => (accessibleColumns as any as string[]).includes(key))
    .map(([key, value]) => ({ key: key as keyof TGetModelDto, value: value })).reverse();


  const columnInfos: ColumnInfos<TGetModelDto> = {
    ...columns.reduce((acc, column) => ({
      ...acc,
      [column.key]: {
        title: toTitleCase(column.key.toString())
      }
    }), {}),
    ...(columnHeaders || {} as ColumnInfos<TGetModelDto>)
  };

  const columnKeys = [...columns.map(({ key }) => ({ key })), { key: "actions" }];

  const sortHandler = useCallback((sortDescriptor: SortDescriptor) => {
    setSortDescriptor(sortDescriptor);
  }, []);



  const renderCell = useCallback((item: any, column: string | number) => {


    const updateModelInItems = (item: TGetModelDto) => {
      const index = items?.models.findIndex(e => e.id === item.id);

      if (items?.models !== undefined) {
        items!.models[index as number] = item;
        setItems({ ...items } as any);
      }

    }



    if (column === "actions") {
      return (
        <div className="relative flex items-center justify-center gap-2">
          {
            viewDetailButton(
              item
            )
          }
          {updateButton(
            item,
            service,
            updateModelInItems
          )}
          <Tooltip color="danger" content="Delete">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon
                onClick={
                  () => {
                    service.delete(item.id)
                    items!.models = items?.models.filter(e => e.id !== item.id) || [];
                    setItems({ ...items } as any);
                  }
                }

              />
            </span>
          </Tooltip>
          {item.seoAddition !== null ? (
            <ButtonForOpenUpdateSeoAdditionModalWindowInTable
              seoAddition={item.seoAddition}
            />
          ) : (
            <></>
          )}
        </div>
      );
    }
    const columnValue = columns.find((c) => c.key === column)?.value;
    const columnName = Object.entries(accessibleNameTypes).find(([, type]) => columnValue instanceof type)
      ?.[0] as keyof TGetModelDto;

    if (displayColumnsMap.has(column as any)) {
      const fun = displayColumnsMap.get(column as any);

      return fun!(getKeyValue(item, column));
    }




    const columnInfo = columnInfos[column as keyof TGetModelDto];
    const value = getKeyValue(item, column);

    return columnInfo?.render?.(value) ?? transforms[columnName as AccessibleTypeNames]?.(value) ?? value;
  }, [columns]);

  const loadItems = useCallback(async () => {
    setLoadingState("loading");
    setError(undefined);
    setPerPageError(undefined);
    if (status !== "success") {
      setLoadingState(status as LoadingState);
      return;
    }
    try {
      setItems(undefined);
      console.log("request making");
      setItems(
        await service.getAll({
          pageNumber: page ? parseInt(page) : 1,
          pageSize: perPage ? parseInt(perPage) || 10 : 10,
          filters: [],
          sorts: sortDescriptor?.column
            ? [
              {
                column: toPascalCase(sortDescriptor.column.toString()),
                sortOrder:
                  sortDescriptor.direction === "ascending"
                    ? SortOrder.Asc
                    : SortOrder.Desc,
              },
            ]
            : [],
        })
      );
      setLoadingState("idle");
    } catch (e) {
      if (e instanceof ZodError) {
        setError(
          Object.entries(e.formErrors.fieldErrors)
            .map(([key, value]) => `\n${toTitleCase(key)}: ${value}`)
            .join(", ")
        );
        if (e.formErrors.fieldErrors.pageSize)
          setPerPageError(e.formErrors.fieldErrors.pageSize.toString());
      } else if (e instanceof Error) setError(e.message);
      else setError(`${e}`);
      setLoadingState("error");
    }
  }, [page, sortDescriptor, perPage, status]);

  useEffect(() => {
    loadItems().then();
  }, [loadItems]);

  return (
    <div className="flex flex-col h-full gap-5">
      <Table
        isHeaderSticky
        className={"h-full overflow-auto"}
        sortDescriptor={sortDescriptor}
        onSortChange={sortHandler}
        classNames={classNames}
      >
        <TableHeader columns={columnKeys}>
          {(column) =>
            <TableColumn className="items-center"
              key={column.key.toString()}
              align={column.key === "actions" ? "center" : "start"}
              allowsSorting={column.key !== "actions" || !dontAllowSort.includes(column.key)}>
              {columnInfos[column.key]?.title ?? toTitleCase(column.key.toString())}
            </TableColumn>}
        </TableHeader>
        <TableBody
          aria-label={toTitleCase(service.modelName) + " Table"}
          loadingState={loadingState}
          items={items?.models || []}
          loadingContent={<Spinner />}
          emptyContent={loadingState === "error" ?
            <h2 className="text-3xl text-danger flex flex-col items-center md:text-6xl">
              <Icon icon="iconamoon:cloud-error-duotone" className="text-6xl md:text-9xl" />
              An error occured: {error?.split("\n").map((e) => <span key={e}>{e}</span>)}
            </h2>
            : <h2 className="text-6xl">No items found</h2>}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(column:any) => <TableCell>{renderCell(item, column)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-5 md:flex-row md:justify-between">
        <TransparentInput
          type="number"
          labelPlacement="outside-left" label="Items Per Page"
          placeholder="10"
          value={perPageState}
          onChange={(e:any) => setPerPageState(e.target.value)}
          isInvalid={!!perPageError}
          errorMessage={perPageError}
          min={perPageMin ?? undefined}
          max={perPageMax ?? undefined}
          isBlurred={true}
        />

        {createButton(service)}

        {items && items.howManyPages > 0 ? (
          <Pagination
            className="min-w-fit h-fit p-0 m-auto md:m-0"
            showControls
            showShadow
            color="primary"
            page={page ? parseInt(page) : 1}
            total={items.howManyPages}
            onChange={(page:any) => setPage(page > 1 ? (page).toString() : "")}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ModelTable;
