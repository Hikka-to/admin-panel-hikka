import { GetSeoAdditionDto } from '@/models/Dto/SeoAdditions/get-seo-addition-dto';
import { Button } from '@heroui/button';
import React, { useState } from 'react'
import ModalWindowForViewSeoAddition from './ModalWindowForViewSeoAddition';

const ButtonForOpenViewSeoAdditionWindow = ({
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
            className='w-full'
            onPress={openModal}
        >View SeoAddition</Button>
        <ModalWindowForViewSeoAddition isOpen={isModalOpen} onClose={closeModal} seoAddition={seoAddition}        
        />

</>
    )
}

export default ButtonForOpenViewSeoAdditionWindow