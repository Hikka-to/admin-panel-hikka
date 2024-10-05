"use client";
import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "@nextui-org/shared-icons";

import { CrudService } from "@/service/shared/CrudService";
import { ModelDto } from "@/models/Shared/model-dto";

import EditModelWindow from "./EditModelWindow";

const ButtonForOpenUpdateModalWindow = <
  TGetModelDto extends ModelDto,
  Service extends CrudService<TGetModelDto, object, ModelDto>,
>({
  model,
  service,
}: {
  model: TGetModelDto;
  service: Service;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip content="Edit model">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon onClick={openModal} />
        </span>
      </Tooltip>
      <EditModelWindow
        isOpen={isModalOpen}
        model={model}
        service={service}
        onClose={closeModal}
      />
    </>
  );
};

export default ButtonForOpenUpdateModalWindow;
