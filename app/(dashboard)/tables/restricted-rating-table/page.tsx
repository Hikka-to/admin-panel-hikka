"use client"
import ModelLayout from '@/components/layouts/ModelLayout';
import ButtonForOpenCreateModalWindow from '@/components/shared/models-windows/shared/buttons/ButtonForOpenCreateModalWindow';
import ButtonForOpenViewDetailModalWindow from '@/components/shared/models-windows/shared/Buttons/ButtonForOpenDetailModalWindow';
import ButtonForOpenUpdateModalWindow from '@/components/shared/models-windows/shared/buttons/ButtonForOpenUpdateModalWindow';
import { GetRestrictedRatingDto } from '@/models/Dto/WithSeoAddition/RestrictedRatings/get-restricted-rating-dto';
import { ModelDto } from '@/models/Shared/model-dto';
import { RestrictedRatingService } from '@/service/crudServices/RestrictedRatingService';
import { CrudService } from '@/service/shared/CrudService';
import ReturnButtonForOpenCreateWindowFunction from '@/types/model-windows/buttons/create-buttons/ReturnButtonForOpenCreateWindowFunction';
import ReturnButtonForOpenUpdateWindowFunction from '@/types/model-windows/buttons/update-buttons/ReturnButtonForOpenUpdateWindowFunction';
import ReturnButtonForOpenViewDetailWindowFunction from '@/types/model-windows/buttons/view-details-buttons/ReturnButtonForOpenViewDetailWindowFunction';
import { Icon } from '@iconify-icon/react';
import React from 'react'

const page = () => {

  let restrictedRatingService = new RestrictedRatingService();




  const returnButtonForOpenCreateWindow: ReturnButtonForOpenCreateWindowFunction<CrudService<ModelDto, object, ModelDto>> = (service: CrudService<ModelDto, object, ModelDto>) => {

    return <ButtonForOpenCreateModalWindow
      service={service}
      specificInputMap={new Map()}

    />

  }


  const returnButtonForOpenUpdateWindow: ReturnButtonForOpenUpdateWindowFunction<GetRestrictedRatingDto, CrudService<GetRestrictedRatingDto, object, ModelDto>> = (
    model: GetRestrictedRatingDto,
    service: CrudService<GetRestrictedRatingDto, object, ModelDto>,
    setModel: (model: GetRestrictedRatingDto) => void
  ) => {



    return <ButtonForOpenUpdateModalWindow
      model={model}
      service={service}
      setModel={setModel}
      specificInputMap={new Map()}
      specificUpdateMap={new Map()}

    />
  }


  const returnButtonForOpenViewDetailWindow: ReturnButtonForOpenViewDetailWindowFunction<GetRestrictedRatingDto> = (model: GetRestrictedRatingDto) => {
    return <ButtonForOpenViewDetailModalWindow
      model={model}
      specificRenderMap={new Map()}
    />
  }



  return <ModelLayout icon={<Icon icon="majesticons:restricted-line" />} title="RestrictedRatings"
    service={restrictedRatingService}
    createButton={returnButtonForOpenCreateWindow}
    updateButton={returnButtonForOpenUpdateWindow}
    viewDetailButton={returnButtonForOpenViewDetailWindow}
    accessibleColumns={
      ["hint","value", "name"]

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