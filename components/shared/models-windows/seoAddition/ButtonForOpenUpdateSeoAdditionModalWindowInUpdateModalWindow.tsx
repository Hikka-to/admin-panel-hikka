"use client"
import { GetSeoAdditionDto } from '@/models/Dto/SeoAdditions/get-seo-addition-dto';
import React, { useState } from 'react'
import ModalWindowForUpdateSeoAddition from './ModalWindowForUpdateSeoAddition';
import { Button } from '@nextui-org/react';

const ButtonForOpenUpdateSeoAdditionModalWindowInUpdateModalWindow = ({
  seoAddition,
}: {
  seoAddition: GetSeoAdditionDto;
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
        <Button 
            color='default'
            onClick={openModal}
        >
            Update Seo Addition
        </Button>
      <ModalWindowForUpdateSeoAddition
        isOpen={isModalOpen}
        seoAddition={seoAddition}
        onClose={closeModal}
      />
    </>
  );
};

export default ButtonForOpenUpdateSeoAdditionModalWindowInUpdateModalWindow