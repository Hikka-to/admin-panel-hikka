import { CrudService } from "@/service/shared/CrudService";
import ButtonForOpenUpdateModalWindowProps from "./ButtonForOpenUpdateModalWindowProps";
import { ReactElement } from "react";
import { ModelDto } from "@/models/Shared/model-dto";

export default interface ReturnButtonForOpenUpdateWindowFunction<
TGetModelDto extends ModelDto,
TService extends CrudService<TGetModelDto, object, ModelDto> > {
    (model : TGetModelDto, service: TService, setModel: (model: TGetModelDto) => void): ReactElement<ButtonForOpenUpdateModalWindowProps<TGetModelDto, TService>, any>,
    

}