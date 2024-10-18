import { CrudService } from '@/service/shared/CrudService'
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import CreateModelWindow from '../models-windows/CreateModelWindow'
import ButtonForOpenCreateModalWindowProps from '@/types/model-windows/buttons/create-buttons/ButtonForOpenCreateModalWindowProps'
import { ModelDto } from '@/models/Shared/model-dto'

const ButtonForOpenCreateModalWindow = <
  Service extends CrudService<ModelDto, object, ModelDto>>({
    service,
    specificInputMap
  } :  ButtonForOpenCreateModalWindowProps<Service>) => {

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
        color='secondary'
        onClick={openModal}
      >
        Create a new model
      </Button>
      <CreateModelWindow
      specificInputMap={specificInputMap}
        isOpen={isModalOpen}
        onClose={closeModal}
        service={service}
      />
    </>
  )
}

export default ButtonForOpenCreateModalWindow