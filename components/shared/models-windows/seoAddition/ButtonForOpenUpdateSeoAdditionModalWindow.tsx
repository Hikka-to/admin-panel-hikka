"use client"
import { GetSeoAdditionDto } from '@/models/Dto/SeoAdditions/get-seo-addition-dto';
import React, { useState } from 'react'
import ModalWindowForUpdateSeoAddition from './ModalWindowForUpdateSeoAddition';
import { Tooltip } from '@nextui-org/react';
import { DeleteIcon, EditIcon, EyeIcon } from "@nextui-org/shared-icons";


const ButtonForOpenUpdateSeoAdditionModalWindow = ({ seoAddition }: { seoAddition: GetSeoAdditionDto }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Tooltip content="Edit seoAddition">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon onClick={openModal} />
                </span>
            </Tooltip>
            <ModalWindowForUpdateSeoAddition
                seoAddition={seoAddition}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    )
}

export default ButtonForOpenUpdateSeoAdditionModalWindow