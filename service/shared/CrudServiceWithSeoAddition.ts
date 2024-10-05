import { GetDtoWithSeoAddition } from "@/models/Shared/get-dto-with-seo-addition";
import { CreateDtoWithSeoAddition } from "@/models/Shared/create-dto-with-seo-addition";
import { UpdateDtoWithSeoAddition } from "@/models/Shared/update-dto-with-seo-addition";

import { CrudService } from "./CrudService";

export abstract class CrudServiceWithSeoAddition<
  TGetModelDto extends GetDtoWithSeoAddition,
  TCreateModelDto extends CreateDtoWithSeoAddition,
  TUpdateModelDto extends UpdateDtoWithSeoAddition,
> extends CrudService<TGetModelDto, TCreateModelDto, TUpdateModelDto> {}
