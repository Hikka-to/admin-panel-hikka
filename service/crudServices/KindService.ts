import { GetKindDto, getKindDtoSchema } from "@/models/Dto/WithSeoAddition/Kinds/get-kind-dto";
import { CrudService } from "../shared/CrudService";
import { CreateKindDto, createKindDtoSchema } from "@/models/Dto/WithSeoAddition/Kinds/create-kind-dto";
import { UpdateKindDto, updateKindDtoSchema } from "@/models/Dto/WithSeoAddition/Kinds/update-kind-dto";

export class KindService extends CrudService<
  GetKindDto,
  CreateKindDto,
  UpdateKindDto
> {
  public constructor() {
    super(getKindDtoSchema, createKindDtoSchema, updateKindDtoSchema, "Kind");
  }
}