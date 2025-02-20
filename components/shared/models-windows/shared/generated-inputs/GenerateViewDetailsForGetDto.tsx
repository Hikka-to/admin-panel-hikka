"use client"
import { ModelDto } from '@/models/Shared/model-dto';
import RenderFunction from '@/types/table/RenderFunction';
import { Chip, Input } from "@heroui/react";
import React, { useCallback } from 'react'
import { object } from 'zod';
import ButtonForOpenViewSeoAdditionWindow from '../../seoAddition/view/ButtonForOpenViewSeoAdditionWindow';
import { GetSeoAdditionDto } from '@/models/Dto/SeoAdditions/get-seo-addition-dto';

const GenerateViewDetailsForGetDto = <TGetModel extends ModelDto>(
  {
    model,
    specificRenderMap
  }: {
    model: TGetModel;
    specificRenderMap: Map<string, RenderFunction>;
  }
) => {

  const renderInput = useCallback((field: keyof typeof model) => {
    const fieldValue = model[field];

 if (field == "seoAddition")
            {

                return (
                    <ButtonForOpenViewSeoAdditionWindow
                    seoAddition={fieldValue as GetSeoAdditionDto}
                    key={field}
                    />
                )
            }
    

    if (specificRenderMap.has(field as string)) {
      const func = specificRenderMap.get(field as string);

      console.debug(fieldValue);

      return func!(fieldValue || '');
    }

    switch (typeof fieldValue) {
      case "string":
        return (
          <Input
          key={field as string}
            type="text"
            label={field as string}
            placeholder={field as string}
            name={field as string}
            value={fieldValue || ''}
            required
          />
        );
      case "number":
        return (
          <Input
          key={field as string}
            type="number"
            label={field as string}
            name={field as string}
            value={fieldValue?.toString() || "0"}
          />
        );
      case "boolean":
        return (
          <Chip key={field as string} color={fieldValue ? "success" : "danger"}>
            {fieldValue ? "True" : "False"}
          </Chip>
        );
      default:
        return <p key={field as string} >Unsupported type: {typeof fieldValue}</p>;
    }
  }, [model, specificRenderMap]);

  return (
    <>
      {Object.keys(model).map((field) => (
        <div key={field}>
          {renderInput(field as keyof typeof model)}
        </div>
      ))}
    </>
  );
};


export default GenerateViewDetailsForGetDto