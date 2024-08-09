import { keys } from 'ts-transformer-keys';
import { GetCountryDto } from '@/models/Dto/WithSeoAddition/Countries/get-country-dto';
import { ModelDto } from '@/models/Shared/model-dto';
import { CrudService } from '@/service/shared/CrudService';
import Service from '@/service/shared/Service';
import { Table, TableBody, TableColumn, TableHeader } from '@nextui-org/table';
import React from 'react'



const ModelTable =  <
  TGetModelDto extends ModelDto,
  TCreateDto,
  TUpdateDto extends ModelDto,
  TService extends CrudService<TGetModelDto, TCreateDto, TUpdateDto>>({ props }: {
    props: {
      Service: TService
    }
  }) => {

  let columns = keys<TGetModelDto>();


  //const items:TModel[]

  return <p>table</p>

  //return (
    //<Table aria-label="Example table with custom cells">
      //<TableHeader columns={columns}>
        //{(column) => (
          //<TableColumn key={column} >
            //{column}
          //</TableColumn>
        //)}
      //</TableHeader>
      //<TableBody>
        //<TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      //</TableBody>
    //</Table>
  //)
}

export default ModelTable;