import { GetSeoAdditionDto } from '@/models/Dto/SeoAdditions/get-seo-addition-dto';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import React from 'react'
import SocialTypeSelector from '../SocialTypeComboBox';
import { SocialType } from '@/models/Dto/SeoAdditions/social-type';
import { Input } from '@heroui/input';

const ModalWindowForViewSeoAddition = ({
    isOpen,
    onClose,
    seoAddition,
}: {
    isOpen: boolean;
    onClose: () => void;
    seoAddition: GetSeoAdditionDto;
}) => {

    type StringKey = keyof Omit<GetSeoAdditionDto, "socialType">;
    const stringKeys = Object.keys(seoAddition).filter(
        (key) =>
            (typeof seoAddition[key as keyof typeof seoAddition] === "string" ||
                seoAddition[key as keyof typeof seoAddition] === null) &&
            key !== "socialType" &&
            seoAddition[key as keyof typeof seoAddition] !== undefined &&
            !key.toLowerCase().includes("id"),
    ) as StringKey[];
    if (!isOpen) return null;


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(innerOnClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            View SeoAddition
                        </ModalHeader>
                        <ModalBody>
                            {stringKeys.map((name) => (
                                <Input
                                
                                    key={name}
                                    label={name}
                                    name={name}
                                    placeholder={name}
                                    value={seoAddition[name] ?? ""}
                                    variant="bordered"
                                />
                            ))}

                            <SocialTypeSelector
                                initialState={seoAddition.socialType}
                                onSelectionChanged={(e: SocialType | null | undefined) =>
                                    (seoAddition.socialType = e)
                                }
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="warning" variant="light" onPress={innerOnClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ModalWindowForViewSeoAddition