"use client"
import ModelLayout from '@/components/layouts/ModelLayout';
import ButtonForOpenCreateModalWindow from '@/components/shared/models-windows/shared/buttons/ButtonForOpenCreateModalWindow';
import ButtonForOpenViewDetailModalWindow from '@/components/shared/models-windows/shared/Buttons/ButtonForOpenDetailModalWindow';
import ButtonForOpenUpdateModalWindow from '@/components/shared/models-windows/shared/buttons/ButtonForOpenUpdateModalWindow';
import { GetStudioDto } from '@/models/Dto/WithSeoAddition/Studios/get-studio-dto';
import { ModelDto } from '@/models/Shared/model-dto';
import { StudioService } from '@/service/crudServices/StudioService';
import { CrudService } from '@/service/shared/CrudService';
import ReturnButtonForOpenCreateWindowFunction from '@/types/model-windows/buttons/create-buttons/ReturnButtonForOpenCreateWindowFunction';
import ReturnButtonForOpenUpdateWindowFunction from '@/types/model-windows/buttons/update-buttons/ReturnButtonForOpenUpdateWindowFunction';
import ReturnButtonForOpenViewDetailWindowFunction from '@/types/model-windows/buttons/view-details-buttons/ReturnButtonForOpenViewDetailWindowFunction';
import RenderFunction from '@/types/table/RenderFunction';
import { Icon } from '@iconify-icon/react';
import Image from 'next/image';
import React from 'react'

const page = () => {

  let studioService = new StudioService();




  const returnButtonForOpenCreateWindow: ReturnButtonForOpenCreateWindowFunction<CrudService<ModelDto, object, ModelDto>> = (service: CrudService<ModelDto, object, ModelDto>) => {

    return <ButtonForOpenCreateModalWindow
      service={service}
      specificInputMap={new Map()}

    />

  }


  const returnButtonForOpenUpdateWindow: ReturnButtonForOpenUpdateWindowFunction<GetStudioDto, CrudService<GetStudioDto, object, ModelDto>> = (
    model: GetStudioDto,
    service: CrudService<GetStudioDto, object, ModelDto>,
    setModel: (model: GetStudioDto) => void
  ) => {



    return <ButtonForOpenUpdateModalWindow
      model={model}
      service={service}
      setModel={setModel}
      specificInputMap={new Map()}
      specificUpdateMap={new Map()}

    />
  }

  const displayImage: RenderFunction = (value: any) => {
    return <Image
        src={value} alt={'logo'}  width={64} height={64}  />
  }

  const returnButtonForOpenViewDetailWindow: ReturnButtonForOpenViewDetailWindowFunction<GetStudioDto> = (model: GetStudioDto) => {
    return <ButtonForOpenViewDetailModalWindow
      model={model}
      specificRenderMap={new Map()}
    />
  }



  return <ModelLayout icon={<Icon icon="arcticons:studio" />} title="Studios"
    service={studioService}
    createButton={returnButtonForOpenCreateWindow}
    updateButton={returnButtonForOpenUpdateWindow}
    viewDetailButton={returnButtonForOpenViewDetailWindow}
    accessibleColumns={
      ["logo", "name"]

    }
    displayColumnsMap={
      new Map([
        ["logo", displayImage]
      ]
      )
    }
    dontAllowSort={["actions"]}

  />;
};

export default page