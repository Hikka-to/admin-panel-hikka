"use client"
import { ModelDto } from '@/models/Shared/model-dto';
import FunctionForReturningSpecificInput from '@/types/model-windows/specific-inputs/FunctionForReturningSpecificInput';
import OnChangeFunctionProps from '@/types/model-windows/specific-inputs/OnChangeFunctionProps';
import { Input, Select } from '@nextui-org/react';
import React, { useCallback } from 'react';
import { ZodString, ZodNumber, ZodBoolean, ZodDate, z, TypeOf, string, number } from 'zod';
import ButtonForOpenUpdateSeoAdditionModalWindowInUpdateModalWindow from '../../seoAddition/ButtonForOpenUpdateSeoAdditionModalWindowInUpdateModalWindow';

const accessibleNameTypes = {
    string: ZodString,
    number: ZodNumber,
    boolean: ZodBoolean,
    date: ZodDate
};

type AccessibleTypeNames = keyof typeof accessibleNameTypes;

const accessibleTypes = Object.values(accessibleNameTypes);

type AccessibleTypes = InstanceType<typeof accessibleNameTypes[AccessibleTypeNames]>;

interface GenerateEditInputForUpdateDtoSchemeProps<T extends Record<string, any>> {
    updateObject: T;
    onChange: OnChangeFunctionProps;
    updateScheme: z.infer<any>;
    specificInputMap: Map<string, FunctionForReturningSpecificInput<ModelDto>>
}

function GenerateEditInputForUpdateDtoScheme<T extends Record<string, any>>({
    updateObject,
    onChange,
    updateScheme,
    specificInputMap = new Map()
}: GenerateEditInputForUpdateDtoSchemeProps<T>): JSX.Element {

    const fieldToTypeMap = new Map<string, AccessibleTypes>();

    // Create a lookup table mapping keys to their types
    Object.entries(updateScheme.shape).forEach(([key, value]) => {
        const type = accessibleTypes.find(type => value instanceof type);
        if (type) {
            fieldToTypeMap.set(key, type as any as AccessibleTypes);
        }
    });

    const renderInput = useCallback((field: keyof typeof updateScheme.shape) => {

        if (field == "id") return;

        const fieldValue = updateObject[field as string];
        const fieldType = fieldToTypeMap.get(field as string);

        if (field == "seoAddition")
            {
                console.debug(updateObject);

                return (
                    <ButtonForOpenUpdateSeoAdditionModalWindowInUpdateModalWindow
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
                        type="text"
                        label= {field as string}
                        placeholder={field as string}
                        name={field as string}
                        value={fieldValue || ''}
                        onChange={(e) => onChange(e, typeof fieldValue)}
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
                        onChange={(e) => onChange(e, typeof fieldValue)}
                        required
                    />
                );
            case "boolean":
                return (
                    <select 
                        name={field as string}
                        onChange={(e) => onChange(e, typeof fieldValue)}>
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
            {Object.entries(updateScheme.shape).map(([key, value]) => (
                <>
                    {renderInput(key as keyof typeof updateScheme.shape)}
                </>
            ))}
        </>
    );
}

export default GenerateEditInputForUpdateDtoScheme;
