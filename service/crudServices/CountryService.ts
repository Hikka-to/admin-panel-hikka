import { CrudService } from "../shared/CrudService";
import { GetCountryDto, getCountryDtoSchema } from "@/models/Dto/WithSeoAddition/Countries/get-country-dto";
import { CreateCountryDto, createCountryDtoSchema } from "@/models/Dto/WithSeoAddition/Countries/create-country-dto";
import { UpdateCountryDto, updateCountryDtoSchema } from "@/models/Dto/WithSeoAddition/Countries/update-country-dto";


export class CountryService extends CrudService<
	GetCountryDto,
	CreateCountryDto,
	UpdateCountryDto
> {

	public constructor() {
		super("Country", getCountryDtoSchema, createCountryDtoSchema, updateCountryDtoSchema);
	}

}


