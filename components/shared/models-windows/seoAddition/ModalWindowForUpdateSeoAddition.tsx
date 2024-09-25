"use client"
import { GetSeoAdditionDto } from '@/models/Dto/SeoAdditions/get-seo-addition-dto';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ModalWindowlayout from '../ModalWindowlayout';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { SeoAdditionService } from '@/service/crudServices/SeoAdditionService';
import { useAuth } from '@/hooks/auth';
import { UpdateSeoAdditionDto, updateSeoAdditionDtoSchema } from '@/models/Dto/SeoAdditions/update-seo-addition-dto';
import SocialTypeSelector from './SocialTypeComboBox';
import { SocialType } from '@/models/Dto/SeoAdditions/social-type';

type ObjectMap<T> = {
  [K in keyof T]: T[K];
};

type BaseObject = {
  [key: string]: unknown;
};

function updateObject(obj1: BaseObject, obj2: BaseObject): BaseObject {
  /**
   * Update obj1 with values from obj2 for matching keys.
   *
   * @param obj1 - The object to be updated.
   * @param obj2 - The object containing new values.
   * @returns Updated obj1 with values from obj2.
   */
  // Create a copy of obj1 to avoid modifying the original
  const updatedObj: BaseObject = { ...obj1 };
  
  // Iterate through the items in obj2
  Object.entries(obj2).forEach(([key, value]) => {
    // Check if the key exists in both objects
    if (key in updatedObj) {
      // Assign the value from obj2 to the corresponding key in updatedObj
      updatedObj[key] = value;
    }
  });

  return updatedObj;
}


const ModalWindowForUpdateSeoAddition = ({ isOpen, onClose, seoAddition }: { isOpen: boolean, onClose: () => void, seoAddition: GetSeoAdditionDto }) => {




    type StringKey = keyof Omit<GetSeoAdditionDto, 'socialType'>;

    const stringKeys = Object.keys(seoAddition).filter(key =>
        typeof seoAddition[key as keyof typeof seoAddition] === 'string' &&
        key !== 'socialType' &&
        seoAddition[key as keyof typeof seoAddition] !== undefined &&
        !key.toLowerCase().includes('id')
    ) as StringKey[];


    let [objectState
        ,
        setState
    ] = useState(seoAddition);


    const onChange = (e: any) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const initialState = { ...seoAddition }

    const clearState = () => {
        setState({ ...initialState });
    };


    const innerOnClose = () => {
        clearState();
        onClose();
    }

    const handleSubmit = async (e: any) => {
        let seoAdditionService = new SeoAdditionService();

        let updateObject : UpdateSeoAdditionDto = {
            description: objectState.description,
            id: seoAddition.id,
            slug: objectState.slug,
            title: objectState.title,
            image: objectState.image,
            imageAlt: objectState.imageAlt,
            socialImage: objectState.socialImage,
            socialImageAlt: objectState.socialImageAlt,
            socialTitle: objectState.socialTitle,
            socialType: objectState.socialType
        };

        seoAddition = objectState;

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
                        <ModalHeader className="flex flex-col gap-1">Update SeoAddition of the model</ModalHeader>
                        <ModalBody>
                            {stringKeys.map(name => (
                                <Input
                                    label={name}
                                    placeholder={name}
                                    variant="bordered"
                                    name={name}
                                    value={objectState[name] || ''}
                                    onChange={onChange}
                                />
                            ))}

                            <SocialTypeSelector
                            initialState={objectState.socialType}
                            onSelectionChanged={(e:SocialType | null | undefined) => objectState.socialType = e}
                            
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
