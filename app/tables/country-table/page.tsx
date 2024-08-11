import ModelTable from "@/components/tables/ModelTable";
import { CountryService } from "@/service/crudServices/CountryService";
import React from "react";
import { GetCountryDto, getCountryDtoProperties } from "hikka-ts-dtos/Dto/WithSeoAddition/Countries/get-country-dto";
import { CreateCountryDto } from "hikka-ts-dtos/Dto/WithSeoAddition/Countries/create-country-dto";
import { UpdateCountryDto } from "hikka-ts-dtos/Dto/WithSeoAddition/Countries/update-country-dto";

const page = () => {


	return <ModelTable<
			GetCountryDto,
			CreateCountryDto,
			UpdateCountryDto,
			CountryService
		>
		props={{
			service: new CountryService(),
			columns: getCountryDtoProperties
		}
		}

	/>;


};

export default page;