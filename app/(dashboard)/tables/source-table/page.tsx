"use client"
import ModelLayout from '@/components/layouts/ModelLayout';
import ButtonForOpenCreateModalWindow from '@/components/shared/models-windows/shared/buttons/ButtonForOpenCreateModalWindow';
import ButtonForOpenViewDetailModalWindow from '@/components/shared/models-windows/shared/Buttons/ButtonForOpenDetailModalWindow';
import ButtonForOpenUpdateModalWindow from '@/components/shared/models-windows/shared/buttons/ButtonForOpenUpdateModalWindow';
import { GetSourceDto } from '@/models/Dto/WithSeoAddition/Sources/get-source-dto';
import { ModelDto } from '@/models/Shared/model-dto';
import { SourceService } from '@/service/crudServices/SourceService';
import { CrudService } from '@/service/shared/CrudService';
import ReturnButtonForOpenCreateWindowFunction from '@/types/model-windows/buttons/create-buttons/ReturnButtonForOpenCreateWindowFunction';
import ReturnButtonForOpenUpdateWindowFunction from '@/types/model-windows/buttons/update-buttons/ReturnButtonForOpenUpdateWindowFunction';
import ReturnButtonForOpenViewDetailWindowFunction from '@/types/model-windows/buttons/view-details-buttons/ReturnButtonForOpenViewDetailWindowFunction';
import { Icon } from '@iconify-icon/react';
import React from 'react'

const page = () => {

  let studioService = new SourceService();




  const returnButtonForOpenCreateWindow: ReturnButtonForOpenCreateWindowFunction<CrudService<ModelDto, object, ModelDto>> = (service: CrudService<ModelDto, object, ModelDto>) => {

    return <ButtonForOpenCreateModalWindow
      service={service}
      specificInputMap={new Map()}

    />

  }


  const returnButtonForOpenUpdateWindow: ReturnButtonForOpenUpdateWindowFunction<GetSourceDto, CrudService<GetSourceDto, object, ModelDto>> = (
    model: GetSourceDto,
    service: CrudService<GetSourceDto, object, ModelDto>,
    setModel: (model: GetSourceDto) => void
  ) => {



    return <ButtonForOpenUpdateModalWindow
      model={model}
      service={service}
      setModel={setModel}
      specificInputMap={new Map()}
      specificUpdateMap={new Map()}

    />
  }


  const returnButtonForOpenViewDetailWindow: ReturnButtonForOpenViewDetailWindowFunction<GetSourceDto> = (model: GetSourceDto) => {
    return <ButtonForOpenViewDetailModalWindow
      model={model}
      specificRenderMap={new Map()}
    />
  }



  return <ModelLayout icon={<Icon icon="fluent-mdl2:open-source" />} title="Sources"
    service={studioService}
    createButton={returnButtonForOpenCreateWindow}
    updateButton={returnButtonForOpenUpdateWindow}
    viewDetailButton={returnButtonForOpenViewDetailWindow}
    accessibleColumns={
      ["name"]

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