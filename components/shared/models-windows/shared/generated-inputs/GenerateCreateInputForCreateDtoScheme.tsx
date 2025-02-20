"use client"
import { CrudService } from '@/service/shared/CrudService';
import FunctionForReturningSpecificInput from '@/types/model-windows/specific-inputs/FunctionForReturningSpecificInput';
import ReturnButtonForOpenCreateWindowFunction from '@/types/model-windows/buttons/create-buttons/ReturnButtonForOpenCreateWindowFunction';
import OnChangeFunctionProps from '@/types/model-windows/specific-inputs/OnChangeFunctionProps';
import SpecificInput from '@/types/model-windows/specific-inputs/SpecificInput';
import { Button, Input } from "@heroui/react";
import React, { ReactElement, useCallback, useState } from 'react'
import { ZodBoolean, ZodDate, ZodNumber, ZodString, z } from 'zod';
import { ModelDto } from '@/models/Shared/model-dto';
import ButtonForOpenCreateModalWindow from '../buttons/ButtonForOpenCreateModalWindow';
import ButtonForOpenCreateSeoAdditionModalWindowInCreateModalWindow from '../../seoAddition/create/ButtonForOpenCreateSeoAdditionModalWindowInCreateModalWindow';

const accessibleNameTypes = {
    string: ZodString,
    number: ZodNumber,
    boolean: ZodBoolean,
    date: ZodDate
};


type AccessibleTypeNames = keyof typeof accessibleNameTypes;

const accessibleTypes = Object.values(accessibleNameTypes);

type AccessibleTypes = InstanceType<typeof accessibleNameTypes[AccessibleTypeNames]>;

interface GenerateCreateInputForCreateDtoSchemeProps {
    createScheme: z.infer<any>;
    form: any,
    onChange: OnChangeFunctionProps;
    specificInputMap: Map<string, FunctionForReturningSpecificInput<ModelDto>>
}

const GenerateCreateInputForCreateDtoScheme = (
  {
    createScheme,
    form,
    onChange,
    specificInputMap

  }
  :GenerateCreateInputForCreateDtoSchemeProps


) => {

 

   const fieldToTypeMap = new Map<string, AccessibleTypes>();

    // Create a lookup table mapping keys to their types
    Object.entries(createScheme).forEach(([key, value]) => {
        const type = accessibleTypes.find(type => value instanceof type);
        if (type) {
            fieldToTypeMap.set(key, type as any as AccessibleTypes);
        }
    });

    const renderInput = useCallback((field: keyof typeof createScheme) => {

        if (field == "id") return;
        const fieldValue = form[field as string];
        const fieldType = fieldToTypeMap.get(field as string);

         if (field == "seoAddition")
            {

                return (
                    <ButtonForOpenCreateSeoAdditionModalWindowInCreateModalWindow
                    key={field as string}
                    seoAddition={fieldValue}
                    />
                )
            }

        if (specificInputMap.has(field as string))
            {
                const func = specificInputMap.get(field as string);

                console.debug(fieldValue);

                return func!(onChange, fieldValue || '');
            }

        switch (typeof fieldValue) {
            case "string":
                return (
                    <Input
                    isRequired
                        key={field as string}
                        errorMessage={"please fill the field"}
                        type="text"
                        label= {field as string}
                        placeholder={field as string}
                        name={field as string}
                        value={fieldValue || ''}
                        onChange={(e) => onChange(e, typeof fieldValue)}
                    />
                );
            case "number":
                return (
                    <Input
                        key={field as string}
                        errorMessage={"please fill the field"}
                        type="number"
                        label= {field as string}
                        name={field as string}
                        value={fieldValue as any as string || "0"}
                        onChange={(e) => onChange(e, typeof fieldValue)}
                        isRequired
                        
                    />
                );
            case "boolean":
                return (
                    <select 
                        name={field as string}
                        key={field as string}
                        onChange={(e) => onChange(e, typeof fieldValue)}>
                        <option value="">Select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                );
            default:
                return <p key={field as string}>Unsupported type: {typeof fieldValue}</p>;
        }
    }, [onChange]);


  return (
    <>
            {Object.entries(form).map(([key, value]) => (
                <>
                    {renderInput(key as keyof typeof createScheme.shape)}
                </>
            ))}
        </>
  )
}

export default GenerateCreateInputForCreateDtoScheme