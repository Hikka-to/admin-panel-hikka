import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import { error } from 'console';
import React, { useState } from 'react'
import { ZodIssue } from 'zod'

const ZodErrorModalWindow = ({errors} : {errors: ZodIssue[]}) => {
    const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(true)}>
            <ModalContent>
                {(innerOnClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Update the model</ModalHeader>
                        <ModalBody>
                            {errors.map(error => (
                                <p>{error.message}
                                </p>
                            ))}


                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onPress={innerOnClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
  );
}

export default ZodErrorModalWindow