import ModelTable from "@/components/tables/ModelTable";
import { CountryService } from "@/service/crudServices/CountryService";
import React from "react";
import { GetCountryDto } from "@/models/Dto/WithSeoAddition/Countries/get-country-dto";
import { CreateCountryDto } from "@/models/Dto/WithSeoAddition/Countries/create-country-dto";
import { UpdateCountryDto } from "@/models/Dto/WithSeoAddition/Countries/update-country-dto";

const page = () => {
	return <ModelTable<
			GetCountryDto,
			CreateCountryDto,
			UpdateCountryDto,
			CountryService
		>
		props={{
			service: new CountryService()
		}}
	/>;
};

export default page;