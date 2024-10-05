"use client"
import { Input, Select } from '@nextui-org/react';
import React, { useCallback } from 'react';
import { ZodString, ZodNumber, ZodBoolean, ZodDate, z, TypeOf, string, number } from 'zod';

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
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    updateScheme: z.infer<any>;
}

function GenerateEditInputForUpdateDtoScheme<T extends Record<string, any>>({
    updateObject,
    onChange,
    updateScheme
}: GenerateEditInputForUpdateDtoSchemeProps<T>): JSX.Element {

    const fieldToTypeMap = new Map<string, AccessibleTypes>();

    // Create a lookup table mapping keys to their types
    Object.entries(updateScheme.shape).forEach(([key, value]) => {
        const type = accessibleTypes.find(type => value instanceof type);
        if (type) {
            fieldToTypeMap.set(key, type as any as AccessibleTypes);
        }
    });

    const renderCell = useCallback((field: keyof typeof updateScheme.shape) => {

        if (field == "id") return;
        const fieldValue = updateObject[field as string];
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
            {Object.entries(updateScheme.shape).map(([key, value]) => (
                <>
                    {renderCell(key as keyof typeof updateScheme.shape)}
                </>
            ))}
        </>
    );
}

export default GenerateEditInputForUpdateDtoScheme;
