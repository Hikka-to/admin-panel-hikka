import { CreateSeoAdditionDto } from '@/models/Dto/SeoAdditions/create-seo-addition-dto'
import { Button } from '@heroui/button';
import React, { useState } from 'react'
import ModalWindowForCreateSeoAddition from './ModalWindowForCreateSeoAddition';

const ButtonForOpenCreateSeoAdditionModalWindowInCreateModalWindow = (
    {
        seoAddition
    } : {
seoAddition: CreateSeoAdditionDto
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
            className='w-full'
            color='default'
            onPress={openModal}
        >
            Seo Addition
        </Button>
      <ModalWindowForCreateSeoAddition
        isOpen={isModalOpen}
        seoAddition={seoAddition}
        onClose={closeModal}
      />
    </>
  );
}

export default ButtonForOpenCreateSeoAdditionModalWindowInCreateModalWindow