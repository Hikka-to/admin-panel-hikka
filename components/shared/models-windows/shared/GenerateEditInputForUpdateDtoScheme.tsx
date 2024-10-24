"use client";
import { Input } from "@nextui-org/react";
import React, { ReactElement } from "react";
import { z, ZodBoolean, ZodDate, ZodNumber, ZodString } from "zod";

const accessibleNameTypes = {
  string: ZodString,
  number: ZodNumber,
  boolean: ZodBoolean,
  date: ZodDate
};

type AccessibleTypeNames = keyof typeof accessibleNameTypes;

const accessibleTypes = Object.values(accessibleNameTypes);

type AccessibleTypes = InstanceType<
  (typeof accessibleNameTypes)[AccessibleTypeNames]
>;

interface GenerateEditInputForUpdateDtoSchemeProps<
  T extends Record<string, any>,
> {
  updateObject: T;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  updateScheme: z.infer<any>;
}

function GenerateEditInputForUpdateDtoScheme<T extends Record<string, any>>({
                                                                              updateObject,
                                                                              onChange,
                                                                              updateScheme
                                                                            }: Readonly<GenerateEditInputForUpdateDtoSchemeProps<T>>): ReactElement {
  const fieldToTypeMap = new Map<string, AccessibleTypes>();

  // Create a lookup table mapping keys to their types
  Object.entries(updateScheme.shape).forEach(([key, value]) => {
    const type = accessibleTypes.find((type) => value instanceof type);

    if (type) {
      fieldToTypeMap.set(key, type as any as AccessibleTypes);
    }
  });

  const renderCell = (field: keyof typeof updateScheme.shape) => {
    if (field == "id") return;
    const fieldValue = updateObject[field as string];
    const fieldType = fieldToTypeMap.get(field as string);

    switch (typeof fieldValue) {
      case "string":
        return (
          <Input
            required
            label={field as string}
            name={field as string}
            placeholder={field as string}
            type="text"
            value={fieldValue || ""}
            onChange={(e) => onChange(e)}
          />
        );
      case "number":
        return (
          <Input
            required
            label={field as string}
            name={field as string}
            type="number"
            value={(fieldValue as any as string) || "0"}
            onChange={(e) => onChange(e)}
          />
        );
      case "boolean":
        return (
          <select name={field as string} onChange={(e) => onChange(e)}>
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      default:
        return <p>Unsupported type: {typeof fieldValue}</p>;
    }
  };

  return (
    <>
      {Object.entries(updateScheme.shape).map(([key, value]) => (
        <>{renderCell(key as keyof typeof updateScheme.shape)}</>
      ))}
    </>
  );
}

export default GenerateEditInputForUpdateDtoScheme;
