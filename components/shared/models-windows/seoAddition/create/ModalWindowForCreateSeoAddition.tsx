import { CreateSeoAdditionDto } from '@/models/Dto/SeoAdditions/create-seo-addition-dto';
import { Input } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import React, { useState } from 'react'
import SocialTypeSelector from '../SocialTypeComboBox';
import { SocialType } from '@/models/Dto/SeoAdditions/social-type';
import { Button } from '@heroui/button';

const ModalWindowForCreateSeoAddition = ({
  isOpen,
  onClose,
  seoAddition,
}: {
  isOpen: boolean;
  onClose: () => void;
  seoAddition: CreateSeoAdditionDto;
}) => {
 type StringKey = keyof Omit<CreateSeoAdditionDto, "socialType">;


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
    // clearState();
    onClose();
  };


  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={innerOnClose}>
      <ModalContent>
        {(innerOnClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create SeoAddition for that model
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
                  (objectState.socialType = e ?? null)
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={innerOnClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalWindowForCreateSeoAddition