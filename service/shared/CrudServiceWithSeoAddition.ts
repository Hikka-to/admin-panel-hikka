import { CrudService } from "./CrudService";
import { CreateDtoWithSeoAddition, GetDtoWithSeoAddition, UpdateDtoWithSeoAddition } from "hikka-ts-dtos";


export abstract class CrudServiceWithSeoAddition<
	GetModelDto extends GetDtoWithSeoAddition,
	CreateModelDto extends CreateDtoWithSeoAddition,
	UpdateModelDto extends UpdateDtoWithSeoAddition,
> extends CrudService<
	GetModelDto,
	CreateModelDto,
	UpdateModelDto

> {

}