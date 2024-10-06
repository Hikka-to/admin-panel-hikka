"use client"
import React, { useState } from 'react'
import { Tooltip } from '@nextui-org/react';
import { DeleteIcon, EditIcon, EyeIcon } from "@nextui-org/shared-icons";
import { CrudService } from '@/service/shared/CrudService';
import EditModelWindow from './EditModelWindow';
import { ModelDto } from '@/models/Shared/model-dto';


const ButtonForOpenUpdateModalWindow = <
    TGetModelDto extends ModelDto,
    Service extends CrudService<TGetModelDto, object, ModelDto>>({
         model,
         service,
         setModel,
         }: {
        model: TGetModelDto,
        service: Service,
        setModel: (item: TGetModelDto) => void,
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
                onClose={closeModal}
                model={model} 
                service={service}
                setModel={setModel}
                />
        </>
    )
}

export default ButtonForOpenUpdateModalWindow