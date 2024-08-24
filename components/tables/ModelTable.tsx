"use client";
import {CrudService} from "@/service/shared/CrudService";
import React, {useCallback, useEffect, useState} from "react";
import {ModelDto} from "@/models/Shared/model-dto";
import {ZodBoolean, ZodNumber, ZodString} from "zod";
import {Table, TableBody, TableColumn, TableHeader} from "@nextui-org/table";
import {getKeyValue, Pagination, SlotsToClasses, Spinner, TableCell, TableRow, TableSlots} from "@nextui-org/react";
import useSearchParam from "@/hooks/useSearchParam";
import {ReturnPageDto} from "@/models/Shared/return-page-dto";
import {Chip} from "@nextui-org/chip";
import {LoadingState} from "@react-types/shared";
import {ColumnHeaders} from "@/types/table/ColumnHeader";
import {toTitleCase} from "@/utils/TextUtils";
import {Icon} from "@iconify-icon/react";
import {useAuthService} from "@/hooks/auth";

const classNames: SlotsToClasses<TableSlots> = {
    wrapper: [
        "bg-background/60",
        "dark:bg-default-100/50",
        "backdrop-blur-md",
        "backdrop-saturate-150"
    ],
    th: [
        "bg-background/30",
        "dark:bg-default-100/40"
    ],
};

const accessibleTypes = [
    ZodString,
    ZodNumber,
    ZodBoolean
];

type AccessibleTypes = InstanceType<typeof accessibleTypes[number]>;

const ModelTable = <
    TGetModelDto extends ModelDto,
    TCreateDto extends object,
    TUpdateDto extends ModelDto>
({props}: {
    props: {
        service: CrudService<TGetModelDto, TCreateDto, TUpdateDto>
        columnHeaders?: ColumnHeaders<TGetModelDto>
    }
}) => {
    const status = useAuthService(props.service);
    const [page, setPage] = useSearchParam("page");
    const [items, setItems] = useState<ReturnPageDto<TGetModelDto>>();
    const [loadingState, setLoadingState] = useState<LoadingState>("loading");
    const getDtoSchema = props.service.getDtoSchema;
    const columns = Object.entries(getDtoSchema.shape).filter(([, value]) => accessibleTypes.find((type) => value instanceof type))
        .map(([key, value]) => ({key: key as keyof TGetModelDto, value: value as AccessibleTypes}))
        .reverse();
    const columnHeaders: ColumnHeaders<TGetModelDto> = {
        ...columns.reduce((acc, column) => ({
            ...acc,
            [column.key]: {
                title: toTitleCase(column.key.toString())
            }
        }), {}),
        ...(props.columnHeaders || {} as ColumnHeaders<TGetModelDto>)
    };

    const renderCell = useCallback((item: any, column: string | number) => {
        const columnValue = columns.find((c) => c.key === column)?.value;

        if (columnValue instanceof ZodBoolean) {
            return (
                <Chip color={item[column] ? "success" : "danger"}>
                    {item[column] ? "True" : "False"}
                </Chip>
            )
        }

        return getKeyValue(item, column);
    }, [columns]);

    useEffect(() => {
        (async () => {
            setLoadingState("loading");
            if (status === "loading") return;
            if (status === "error") {
                setLoadingState("error");
                return;
            }
            try {
                setItems(undefined);
                setItems((await props.service.getAll({
                    pageNumber: page ? parseInt(page) : 1,
                    pageSize: 10,
                    filters: [],
                    sorts: [],
                })));
                setLoadingState("idle");
            } catch (e) {
                setLoadingState("error");
            }
        })();
    }, [page]);

    return (
        <Table
            classNames={classNames}
            bottomContent={
                items && items.howManyPages > 0 ? (
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page ? parseInt(page) : 1}
                            total={items.howManyPages}
                            onChange={(page) => setPage(page > 1 ? (page).toString() : "")}
                        />
                    </div>
                ) : null
            }
        >
            <TableHeader columns={columns}>
                {(column) =>
                    <TableColumn key={column.key.toString()}>
                        {columnHeaders[column.key]!.icon}
                        {columnHeaders[column.key]!.title}
                    </TableColumn>}
            </TableHeader>
            <TableBody
                aria-label={toTitleCase(props.service.modelName) + " Table"}
                loadingState={loadingState}
                items={items?.models || []}
                loadingContent={<Spinner/>}
                emptyContent={loadingState === "error" ?
                    <h2 className="text-6xl text-danger flex flex-col items-center">
                        <Icon icon="iconamoon:cloud-error-duotone" className="text-9xl"/>
                        An error occured
                    </h2>
                    : <h2 className="text-6xl">No items found</h2>}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(column) => <TableCell>{renderCell(item, column)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
};

export default ModelTable;