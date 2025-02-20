import { GetStudioDto, getStudioDtoSchema } from "@/models/Dto/WithSeoAddition/Studios/get-studio-dto";
import { CrudService } from "../shared/CrudService";
import { CreateStudioDto, createStudioDtoSchema } from "@/models/Dto/WithSeoAddition/Studios/create-studio-dto";
import { UpdateStudioDto, updateStudioDtoSchema } from "@/models/Dto/WithSeoAddition/Studios/update-studio-dto";

export class StudioService extends CrudService<
  GetStudioDto,
  CreateStudioDto,
  UpdateStudioDto
> {
  public constructor() {
    super(getStudioDtoSchema, createStudioDtoSchema, updateStudioDtoSchema, "studio");
  }
}
