"use client";

import ModelLayout from '@/components/layouts/ModelLayout';
import ButtonForOpenCreateModalWindow from '@/components/shared/models-windows/shared/buttons/ButtonForOpenCreateModalWindow';
import ButtonForOpenViewDetailModalWindow from '@/components/shared/models-windows/shared/Buttons/ButtonForOpenDetailModalWindow';
import ButtonForOpenUpdateModalWindow from '@/components/shared/models-windows/shared/buttons/ButtonForOpenUpdateModalWindow';
import { useAuthService } from '@/hooks/auth';
import { GetCountryDto } from '@/models/Dto/WithSeoAddition/Countries/get-country-dto';
import { GetKindDto } from '@/models/Dto/WithSeoAddition/Kinds/get-kind-dto';
import { ModelDto } from '@/models/Shared/model-dto';
import { CountryService } from '@/service/crudServices/CountryService';
import { KindService } from '@/service/crudServices/KindService';
import { CrudService } from '@/service/shared/CrudService';
import ReturnButtonForOpenCreateWindowFunction from '@/types/model-windows/buttons/create-buttons/ReturnButtonForOpenCreateWindowFunction';
import ReturnButtonForOpenUpdateWindowFunction from '@/types/model-windows/buttons/update-buttons/ReturnButtonForOpenUpdateWindowFunction';
import ReturnButtonForOpenViewDetailWindowFunction from '@/types/model-windows/buttons/view-details-buttons/ReturnButtonForOpenViewDetailWindowFunction';
import { Icon } from '@iconify-icon/react';
import React from 'react'

const page = () => {
  let countryService = new KindService();

  const returnButtonForOpenCreateWindow: ReturnButtonForOpenCreateWindowFunction<CrudService<ModelDto, object, ModelDto>> = (service: CrudService<ModelDto, object, ModelDto>) => {

    return <ButtonForOpenCreateModalWindow
      service={service}
      specificInputMap={new Map()}

    />

  }


  const returnButtonForOpenUpdateWindow: ReturnButtonForOpenUpdateWindowFunction<GetKindDto, CrudService<GetKindDto, object, ModelDto>> = (
    model: GetKindDto,
    service: CrudService<GetKindDto, object, ModelDto>,
    setModel: (model: GetKindDto) => void
  ) => {



    return <ButtonForOpenUpdateModalWindow
      model={model}
      service={service}
      setModel={setModel}
      specificInputMap={new Map()}
      specificUpdateMap={new Map()}

    />
  }


  const returnButtonForOpenViewDetailWindow: ReturnButtonForOpenViewDetailWindowFunction<GetKindDto> = (model: GetKindDto) => {
    return <ButtonForOpenViewDetailModalWindow
      model={model}
      specificRenderMap={new Map()}
    />
  }




  return <ModelLayout icon={<Icon icon="mynaui:letter-k-solid" />} title="Kinds"
    service={countryService}
    createButton={returnButtonForOpenCreateWindow}
    updateButton={returnButtonForOpenUpdateWindow}
    viewDetailButton={returnButtonForOpenViewDetailWindow}
    accessibleColumns={
      ["slug", "hint"]

    }
    displayColumnsMap={
      new Map([
      ]
      )
    }
    dontAllowSort={["actions"]}

  />;
}

export default page