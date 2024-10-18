"use client"

import { ModelDto } from '@/AppDtos/Shared/model-dto'
import { Button, Tooltip } from '@nextui-org/react';
import {  EyeIcon } from "@nextui-org/shared-icons";
import React, { useState } from 'react'
import CreateModelWindow from '../models-windows/CreateModelWindow';
import RenderFunction from '@/types/table/RenderFunction';
import ViewDetailsWindow from '../models-windows/ViewDetailsWindow';

const ButtonForOpenViewDetailModalWindow = <TGetModelDto extends ModelDto>({
  model,
  specificRenderMap
}:{
  model:TGetModelDto,
   specificRenderMap :Map<string, RenderFunction>
}
) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
  return (
    <>
      <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon onClick={openModal} />
            </span>
          </Tooltip>
      <ViewDetailsWindow
      isOpen={isModalOpen}
      model={model}
      onClose={closeModal}
      specificRenderMap={specificRenderMap}
      />
    </>
  )
}

export default ButtonForOpenViewDetailModalWindow