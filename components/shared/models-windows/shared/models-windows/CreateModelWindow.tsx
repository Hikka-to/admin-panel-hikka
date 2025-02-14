import { CrudService } from '@/service/shared/CrudService'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import React, { ReactElement, useEffect, useState } from 'react'
import GenerateCreateInputForCreateDtoScheme from '../generated-inputs/GenerateCreateInputForCreateDtoScheme';
import { Button, Form } from "@heroui/react";
import { number, string, ZodError } from 'zod';
import ZodErrorModalWindow from './ZodErrorModalWindow';
import SpecificInput from '@/types/model-windows/specific-inputs/SpecificInput';
import ReturnButtonForOpenCreateWindowFunction from '@/types/model-windows/buttons/create-buttons/ReturnButtonForOpenCreateWindowFunction';
import FunctionForReturningSpecificInput from '@/types/model-windows/specific-inputs/FunctionForReturningSpecificInput';
import { ModelDto } from '@/models/Shared/model-dto';

const CreateModelWindow = <Service extends CrudService<ModelDto, object, ModelDto>>(
    {
        isOpen,
        onClose,
        service,
        specificInputMap
    }: {
        isOpen: boolean,
        onClose: () => void,
        service: Service,
        specificInputMap: Map<string, FunctionForReturningSpecificInput<ModelDto>>
    }
) => {

    const [initialForm, setInitialForm] = useState(service.createDtoSchema.parse({}));


    const [errorsForm, setErrorsForm] = useState({});
    const [form, setForm] = useState({ ...initialForm });
    const [isError, setIsError] = useState(false);
    const [errors, setErros] = useState<Zod.ZodIssue[]>([]);



    const clearState = () => {
        setForm({ ...initialForm });
    };

    const onChange = (e: any, type: string) => {
        let { name, value } = e.target;
        if (type === "number") {
            value = Number(value)
            setForm((prevState: any) => ({ ...prevState, [name]: value }));
        }
        else if (type == "boolean") {

            value = Boolean(value)
            setForm((prevState: any) => ({ ...prevState, [name]: value }));
        }
        else {
            console.debug(e);
            setForm((prevState: any) => ({ ...prevState, [name]: value }));
        }
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
            else {
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
                                <Form
                                    className="w-full max-w-xs flex flex-col gap-4"
                                    validationBehavior="native"
                                    validationErrors={errorsForm}
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        await handleSubmit();
                                    }}
                                >
                                    {
                                        <GenerateCreateInputForCreateDtoScheme
                                            createScheme={service.createDtoSchema}
                                            form={form}
                                            onChange={onChange}
                                            specificInputMap={
                                                specificInputMap
                                            }
                                        />
                                    }
                                    <div className="flex gap-2">
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button type="reset" variant="flat" onPress={clearState}>
                                            Reset
                                        </Button>

                                        <Button color="primary" type='submit' onSubmit={handleSubmit}>
                                            submit
                                        </Button>
                                    </div>
                                </Form>

                            </ModalBody>
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