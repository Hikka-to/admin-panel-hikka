import { GetSourceDto, getSourceDtoSchema } from "@/models/Dto/WithSeoAddition/Sources/get-source-dto";
import { CrudService } from "../shared/CrudService";
import { CreateSourceDto, createSourceDtoSchema } from "@/models/Dto/WithSeoAddition/Sources/create-source-dto";
import { UpdateSourceDto, updateSourceDtoSchema } from "@/models/Dto/WithSeoAddition/Sources/update-source-dto";

export class SourceService extends CrudService<
  GetSourceDto,
  CreateSourceDto,
  UpdateSourceDto
> {
  public constructor() {
    super(getSourceDtoSchema, createSourceDtoSchema, updateSourceDtoSchema, "Source");
  }
}