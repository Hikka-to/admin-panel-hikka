import { GetCountryDto } from "@/models/Dto/WithSeoAddition/Countries/get-country-dto";
import { CrudService } from "../shared/CrudService";
import { CreateCountryDto } from "@/models/Dto/WithSeoAddition/Countries/create-country-dto";
import { UpdateCountryDto } from "@/models/Dto/WithSeoAddition/Countries/update-country-dto";

export class CountryService extends CrudService<
    GetCountryDto,
    CreateCountryDto,
    UpdateCountryDto
> 
{

    public constructor()
    {
        super("Country");
    }

}


