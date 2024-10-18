"use client"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import { error } from 'console';
import React, { useState } from 'react'
import { ZodIssue } from 'zod'

const ZodErrorModalWindow = ({errors, isOpen, setIsOpen} : {errors: ZodIssue[], isOpen: boolean, setIsOpen: (value:any) => void}) => {

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalContent>
                {(innerOnClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Errors</ModalHeader>
                        <ModalBody>
                            {errors.map(error => (
                                <p> {error.path} = {error.message}
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