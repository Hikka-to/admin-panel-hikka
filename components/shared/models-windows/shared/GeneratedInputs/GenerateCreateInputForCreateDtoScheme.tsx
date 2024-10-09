"use client"
import { Button, Input } from '@nextui-org/react';
import React, { useCallback, useState } from 'react'
import { ZodBoolean, ZodDate, ZodNumber, ZodString, z } from 'zod';

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
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const GenerateCreateInputForCreateDtoScheme = (
  {
    createScheme,
    form,
    onChange

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

        switch (typeof fieldValue) {
            case "string":
                return (
                    <Input
                        type="text"
                        label= {field as string}
                        placeholder={field as string}
                        name={field as string}
                        value={fieldValue || ''}
                        onChange={(e) => onChange(e)}
                        required
                    />
                );
            case "number":
                return (
                    <Input
                        type="number"
                        label= {field as string}
                        name={field as string}
                        value={fieldValue as any as string  || "0"}
                        onChange={(e) => onChange(e)}
                        required
                    />
                );
            case "boolean":
                return (
                    <select 
                        name={field as string}
                        onChange={(e) => onChange(e)}>
                        <option value="">Select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                );
            default:
                return <p>Unsupported type: {typeof fieldValue}</p>;
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