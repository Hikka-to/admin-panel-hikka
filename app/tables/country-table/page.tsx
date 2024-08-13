import ModelTable from "@/components/tables/ModelTable";
import { CountryService } from "@/service/crudServices/CountryService";
import React from "react";
import { CreateCountryDto, GetCountryDto, UpdateCountryDto } from "hikka-ts-dtos";

const page = () => {


	return <ModelTable<
			GetCountryDto,
			CreateCountryDto,
			UpdateCountryDto,
			CountryService
		>
		props={{
			service: new CountryService()
		}
		}

	/>;


};

export default page;