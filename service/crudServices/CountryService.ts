import { CrudService } from "../shared/CrudService";
import { CreateCountryDto, GetCountryDto, UpdateCountryDto } from "hikka-ts-dtos";

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


