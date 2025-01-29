"use client"
import React, { useState } from 'react'
import { Tooltip } from "@heroui/react";
import { DeleteIcon, EditIcon, EyeIcon } from "@heroui/shared-icons";
import { CrudService } from '@/service/shared/CrudService';
import EditModelWindow from '../models-windows/EditModelWindow';
import ButtonForOpenUpdateModalWindowProps from '@/types/model-windows/buttons/update-buttons/ButtonForOpenUpdateModalWindowProps';
import { ModelDto } from '@/models/Shared/model-dto';


const ButtonForOpenUpdateModalWindow = <
    TGetModelDto extends ModelDto,
    Service extends CrudService<TGetModelDto, object, ModelDto>>({
         model,
         service,
         setModel,
         specificInputMap = new Map([]),
         specificUpdateMap = new Map([])
         }: ButtonForOpenUpdateModalWindowProps<TGetModelDto, Service>) => {
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
                onClose={closeModal}
                model={model} 
                service={service}
                setModel={setModel}
                specificInputMap={specificInputMap}
                specificUpdateMap={specificUpdateMap}

                />
        </>
    )
}

export default ButtonForOpenUpdateModalWindow