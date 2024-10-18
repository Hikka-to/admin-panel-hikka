"use client";
import React from "react";
import { Icon } from "@iconify-icon/react";
import { useTranslations } from "use-intl";

import { CountryService } from "@/service/crudServices/CountryService";
import ModelLayout from "@/components/layouts/ModelLayout";
import ReturnButtonForOpenCreateWindowFunction from "@/types/model-windows/buttons/create-buttons/ReturnButtonForOpenCreateWindowFunction";
import { CrudService } from "@/service/shared/CrudService";
import { ModelDto } from "@/models/Shared/model-dto";
import ButtonForOpenCreateModalWindow from "@/components/shared/models-windows/shared/buttons/ButtonForOpenCreateModalWindow";
import ReturnButtonForOpenUpdateWindowFunction from "@/types/model-windows/buttons/update-buttons/ReturnButtonForOpenUpdateWindowFunction";
import { GetCountryDto } from "@/models/Dto/WithSeoAddition/Countries/get-country-dto";
import ButtonForOpenUpdateModalWindow from "@/components/shared/models-windows/shared/buttons/ButtonForOpenUpdateModalWindow";
import RenderFunction from "@/types/table/RenderFunction";
import ButtonForOpenViewDetailModalWindow from "@/components/shared/models-windows/shared/buttons/ButtonForOpenDetailModalWindow";
import ReturnButtonForOpenViewDetailWindowFunction from "@/types/model-windows/buttons/view-details-buttons/ReturnButtonForOpenViewDetailWindowFunction";

const CountryTablePage = () => {
  const t = useTranslations("Tables.Countries");

   let countryService = new CountryService();

  const returnButtonForOpenCreateWindow: ReturnButtonForOpenCreateWindowFunction<CrudService<ModelDto, object, ModelDto>> = (service: CrudService<ModelDto, object, ModelDto>) => {

    return <ButtonForOpenCreateModalWindow
      service={service}
      specificInputMap={new Map()}

    />

  }


  const returnButtonForOpenUpdateWindow: ReturnButtonForOpenUpdateWindowFunction<GetCountryDto, CrudService<GetCountryDto, object, ModelDto>> = (
    model: GetCountryDto,
    service: CrudService<GetCountryDto, object, ModelDto>,
    setModel: (model: GetCountryDto) => void
  ) => {



    return <ButtonForOpenUpdateModalWindow
      model={model}
      service={service}
      setModel={setModel}
      specificInputMap={new Map()}
      specificUpdateMap={new Map()}

    />
  }

  const displayIcon: RenderFunction = (value: any) => {
    return <Icon icon={value}
    />
  }

  const returnButtonForOpenViewDetailWindow: ReturnButtonForOpenViewDetailWindowFunction<GetCountryDto> = (model: GetCountryDto) => {
    return <ButtonForOpenViewDetailModalWindow
      model={model}
      specificRenderMap={new Map()}
    />
  }



  return <ModelLayout icon={<Icon icon="solar:globus-bold-duotone" />} title="Countries"
    service={countryService}
    createButton={returnButtonForOpenCreateWindow}
    updateButton={returnButtonForOpenUpdateWindow}
    viewDetailButton={returnButtonForOpenViewDetailWindow}
    accessibleColumns={
      ["icon", "name"]

    }
    displayColumnsMap={
      new Map([
        ["icon", displayIcon]
      ]
      )
    }
    dontAllowSort={["actions"]}

  />;
};

export default CountryTablePage;
