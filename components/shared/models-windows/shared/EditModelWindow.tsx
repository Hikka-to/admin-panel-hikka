"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { ZodError } from "zod";

import { CrudService } from "@/service/shared/CrudService";

import GenerateEditInputForUpdateDtoScheme from "./GenerateEditInputForUpdateDtoScheme";
import { ModelDto } from "@/models/Shared/model-dto";

const EditModelWindow = <
  TGetModelDto extends ModelDto,
  Service extends CrudService<TGetModelDto, object, ModelDto>,
>({
  isOpen,
  onClose,
  model,
  service,
}: {
  isOpen: boolean;
  onClose: () => void;
  model: TGetModelDto;
  service: Service;
}) => {
  type StringKey = keyof TGetModelDto;

  const stringKeys = Object.keys(model).filter(
    (key) =>
      typeof model[key as keyof typeof model] === "string" &&
      model[key as keyof typeof model] !== undefined &&
      !key.toLowerCase().includes("id"),
  ) as StringKey[];

  let [objectState, setState] = useState(model);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const [initialState, setInitialState] = useState({ ...model });

  const clearState = () => {
    setState({ ...initialState });
  };

  const handleSubmit = async () => {
    objectState.id = model.id;
    try {
      await service.update(objectState);
      setState({ ...objectState });
      setInitialState({ ...objectState });
      innerOnClose();
    } catch (e) {
      if (e instanceof ZodError) {
        console.error(e.errors);
      } else {
        throw e;
      }
    }
  };

  const innerOnClose = () => {
    clearState();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={innerOnClose}>
      <ModalContent>
        {(innerOnClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update the model
            </ModalHeader>
            <ModalBody>
              {/* {stringKeys.map(name => (
                                <Input
                                    label={name as string}
                                    placeholder={name as string}
                                    variant="bordered"
                                    name={name as string}
                                    value={objectState[name] as string || ''}
                                    onChange={onChange}
                                />
                            ))} */}
              {
                <GenerateEditInputForUpdateDtoScheme
                  updateObject={objectState}
                  updateScheme={service.updateDtoSchema}
                  onChange={onChange}
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
  );
};

export default EditModelWindow;
