import { CrudService } from "@/service/shared/CrudService";
import React from "react";
import { ModelDto } from "hikka-ts-dtos/Shared/model-dto";


const ModelTable = <
	TGetModelDto extends ModelDto,
	TCreateDto,
	TUpdateDto extends ModelDto,
	TService extends CrudService<TGetModelDto, TCreateDto, TUpdateDto>>({ props }: {
	props: {
		service: TService,
		columns?: (keyof TGetModelDto)[],
	}
}) => {


	//const items:TModel[]

	return <p>table</p>;

	//return (
	//<Table aria-label="Example table with custom cells">
	//<TableHeader columns={columns}>
	//{(column) => (
	//<TableColumn key={column} >
	//{column}
	//</TableColumn>
	//)}
	//</TableHeader>
	//<TableBody>
	//<TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
	//</TableBody>
	//</Table>
	//)
};

export default ModelTable;