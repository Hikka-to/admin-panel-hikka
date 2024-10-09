import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react';
import { ZodError } from 'zod';
import ZodErrorModalWindow from './ZodErrorModalWindow';
import { ModelDto } from '@/models/Shared/model-dto';
import { CrudService } from '@/service/shared/CrudService';
import GenerateCreateInputForCreateDtoScheme from './GeneratedInputs/GenerateCreateInputForCreateDtoScheme';

const CreateModelWindow = <Service extends CrudService<ModelDto, object, ModelDto>>(
     {
            isOpen,
            onClose,
            service,
        }: {
            isOpen: boolean,
            onClose: () => void,
            service: Service,
        }
) => {

    const [initialForm, setInitialForm] = useState(service.createDtoSchema.parse({}));


  const [form, setForm] = useState({...initialForm});
  const [isError, setIsError] = useState(false);
  const [errors, setErros] = useState<Zod.ZodIssue[]>([]);


   const clearState = () => {
        setForm({ ...initialForm });
    };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevState:any) => ({ ...prevState, [name]: value }));
  };


    const handleSubmit = async () => {
        try {
            await service.create(form);
            clearState();
            onClose();
        } catch (e) {
            if (e instanceof ZodError) {
                setErros(e.errors);
                setIsError(true);
            }
            else
            {
                throw e;
            }

        }
    }

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Create the model</ModalHeader>
                        <ModalBody>
                            {
                            <GenerateCreateInputForCreateDtoScheme
                            createScheme={service.createDtoSchema}
                            form={form}
                            onChange={onChange}
                            />
                            }


                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                submit
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        <ZodErrorModalWindow
            errors={errors}
            isOpen={isError}
            setIsOpen={setIsError}
        />
</>
  )
}

export default CreateModelWindow