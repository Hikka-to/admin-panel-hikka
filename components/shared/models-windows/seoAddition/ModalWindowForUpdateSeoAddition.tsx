"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { GetSeoAdditionDto } from "@/models/Dto/SeoAdditions/get-seo-addition-dto";
import { SeoAdditionService } from "@/service/crudServices/SeoAdditionService";
import { useAuthService } from "@/hooks/auth";
import { UpdateSeoAdditionDto } from "@/models/Dto/SeoAdditions/update-seo-addition-dto";
import { SocialType } from "@/models/Dto/SeoAdditions/social-type";

import SocialTypeSelector from "./SocialTypeComboBox";
const ModalWindowForUpdateSeoAddition = ({
  isOpen,
  onClose,
  seoAddition,
}: {
  isOpen: boolean;
  onClose: () => void;
  seoAddition: GetSeoAdditionDto;
}) => {
  type StringKey = keyof Omit<GetSeoAdditionDto, "socialType">;

  let seoAdditionService = new SeoAdditionService();

  useAuthService(seoAdditionService);

  const stringKeys = Object.keys(seoAddition).filter(
    (key) =>
      typeof seoAddition[key as keyof typeof seoAddition] === "string" &&
      key !== "socialType" &&
      seoAddition[key as keyof typeof seoAddition] !== undefined &&
      !key.toLowerCase().includes("id"),
  ) as StringKey[];

  const [objectState, setObjectState] = useState(seoAddition);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setObjectState((prevState) => ({ ...prevState, [name]: value }));
  };

  const initialState = { ...seoAddition };

  const clearState = () => {
    setObjectState({ ...initialState });
  };

  const innerOnClose = () => {
    clearState();
    onClose();
  };

  const handleSubmit = async () => {
    let updateObject: UpdateSeoAdditionDto = {
      description: objectState.description,
      id: seoAddition.id,
      slug: objectState.slug,
      title: objectState.title,
      image: objectState.image,
      imageAlt: objectState.imageAlt,
      socialImage: objectState.socialImage,
      socialImageAlt: objectState.socialImageAlt,
      socialTitle: objectState.socialTitle,
      socialType: objectState.socialType,
    };

    seoAddition.description = objectState.description;
    seoAddition.slug = objectState.slug;
    seoAddition.title = objectState.title;
    seoAddition.image = objectState.image;
    seoAddition.imageAlt = objectState.imageAlt;
    seoAddition.socialImage = objectState.socialImage;
    seoAddition.socialImageAlt = objectState.socialImageAlt;
    seoAddition.socialTitle = objectState.socialTitle;
    seoAddition.socialType = objectState.socialType;

    await new SeoAdditionService().update(updateObject);
    onClose();

    return false;
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={innerOnClose}>
      <ModalContent>
        {(innerOnClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update SeoAddition of the model
            </ModalHeader>
            <ModalBody>
              {stringKeys.map((name) => (
                <Input
                  key={name}
                  label={name}
                  name={name}
                  placeholder={name}
                  value={objectState[name] ?? ""}
                  variant="bordered"
                  onChange={onChange}
                />
              ))}

              <SocialTypeSelector
                initialState={objectState.socialType}
                onSelectionChanged={(e: SocialType | null | undefined) =>
                  (objectState.socialType = e)
                }
              />
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

export default ModalWindowForUpdateSeoAddition;
