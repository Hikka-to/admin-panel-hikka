"use client"
import { CrudService } from '@/service/shared/CrudService'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React, { ReactElement, useEffect, useState } from 'react'
import { ZodError } from 'zod';
import GenerateEditInputForUpdateDtoScheme from '../generated-inputs/GenerateEditInputForUpdateDtoScheme';
import ZodErrorModalWindow from './ZodErrorModalWindow';
import FunctionForReturningSpecificInput from '@/types/model-windows/specific-inputs/FunctionForReturningSpecificInput';
import { ModelDto } from '@/models/Shared/model-dto';

const EditModelWindow = <
    TGetModelDto extends ModelDto,
    Service extends CrudService<TGetModelDto, object, ModelDto>>(
        {
            isOpen,
            onClose,
            model,
            service,
            setModel,
            specificInputMap = new Map([]),
            specificUpdateMap = new Map([])

        }: {
            isOpen: boolean,
            onClose: () => void,
            model: TGetModelDto,
            service: Service,
            setModel: (model : TGetModelDto) => void;
            specificInputMap: Map<string, FunctionForReturningSpecificInput<ModelDto>>;
            specificUpdateMap: Map<string, (innerSetState: React.SetStateAction<any>, updateObject: TGetModelDto) => void>
        }) => {


    let [objectState
        ,
        setState
    ] = useState(model);

  const [isError, setIsError] = useState(false);
  const [errors, setErros] = useState<Zod.ZodIssue[]>([]);


  useEffect(() => {
    specificUpdateMap.forEach((key, value) => {
        key(setState, objectState);
    });
  },
    
  []);


     const onChange = (e: any, type: string) => {
        let { name, value } = e.target;
        if (type === "number") {
            value = Number(value)
            setState((prevState: any) => ({ ...prevState, [name]: value }));
        }
        else if (type == "boolean") {

            value = Boolean(value)
            setState((prevState: any) => ({ ...prevState, [name]: value }));
        }
        else {
            setState((prevState: any) => ({ ...prevState, [name]: value }));
        }
    };


    const [initialState, setInitialState ] = useState({ ...model });

    const clearState = () => {
        setState({ ...initialState });
    };

    const handleSubmit = async () => {
        objectState.id = model.id;
        try {
            console.debug(objectState);
            await service.update(objectState);
            setState({... objectState});
            setInitialState({...objectState});
            setModel(objectState);
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



    const innerOnClose = () => {
        clearState();
        onClose();
    }
    return (
        <>
        <Modal isOpen={isOpen} onClose={innerOnClose}>
            <ModalContent>
                {(innerOnClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Update the model</ModalHeader>
                        <ModalBody>
                            {
                            <GenerateEditInputForUpdateDtoScheme
                            onChange={onChange}
                            updateObject={objectState}
                            updateScheme={service.updateDtoSchema}
                            specificInputMap={specificInputMap}
                            />
                            }


                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={innerOnClose}>
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

export default EditModelWindow