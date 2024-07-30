import {GetDtoWithSeoAddition} from "@/models/Shared/get-dto-with-seo-addition";
import {CrudService} from "./CrudService";
import {CreateDtoWithSeoAddition} from "@/models/Shared/create-dto-with-seo-addition";
import {UpdateDtoWithSeoAddition} from "@/models/Shared/update-dto-with-seo-addition";


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