import {
  GetCountryDto,
  getCountryDtoSchema,
} from "@/models/Dto/WithSeoAddition/Countries/get-country-dto";
import {
  CreateCountryDto,
  createCountryDtoSchema,
} from "@/models/Dto/WithSeoAddition/Countries/create-country-dto";
import {
  UpdateCountryDto,
  updateCountryDtoSchema,
} from "@/models/Dto/WithSeoAddition/Countries/update-country-dto";

import { CrudService } from "../shared/CrudService";

export class CountryService extends CrudService<
  GetCountryDto,
  CreateCountryDto,
  UpdateCountryDto
> {
  public constructor() {
    super(getCountryDtoSchema, createCountryDtoSchema, updateCountryDtoSchema);
  }
}
