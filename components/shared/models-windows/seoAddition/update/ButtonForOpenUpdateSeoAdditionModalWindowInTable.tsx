"use client";
import React, { useState } from "react";
import { Tooltip } from "@heroui/react";
import { EditIcon } from "@heroui/shared-icons";

import { GetSeoAdditionDto } from "@/models/Dto/SeoAdditions/get-seo-addition-dto";
import ModalWindowForUpdateSeoAddition from "./ModalWindowForUpdateSeoAddition";


const ButtonForOpenUpdateSeoAdditionModalWindowInTable = ({
  seoAddition,
}: {
  seoAddition: GetSeoAdditionDto;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = "Tables";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip content={"Edit seoAddition"}>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon onClick={openModal} />
        </span>
      </Tooltip>
      <ModalWindowForUpdateSeoAddition
        isOpen={isModalOpen}
        seoAddition={seoAddition}
        onClose={closeModal}
      />
    </>
  );
};

export default ButtonForOpenUpdateSeoAdditionModalWindowInTable;
