import { GetSeoAdditionDto, getSeoAdditionDtoSchema } from "@/models/Dto/SeoAdditions/get-seo-addition-dto";
import { CrudService } from "../shared/CrudService";
import { CreateSeoAdditionDto, createSeoAdditionDtoSchema } from "@/models/Dto/SeoAdditions/create-seo-addition-dto";
import { UpdateSeoAdditionDto, updateSeoAdditionDtoSchema } from "@/models/Dto/SeoAdditions/update-seo-addition-dto";


export class SeoAdditionService extends CrudService<
    GetSeoAdditionDto,
    CreateSeoAdditionDto,
    UpdateSeoAdditionDto
> {

    public constructor() {
        super(getSeoAdditionDtoSchema, createSeoAdditionDtoSchema, updateSeoAdditionDtoSchema);
    }

}