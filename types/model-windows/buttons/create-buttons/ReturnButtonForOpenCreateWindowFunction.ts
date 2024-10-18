import { CrudService } from "@/service/shared/CrudService";
 import ButtonForOpenCreateModalWindowProps from "./ButtonForOpenCreateModalWindowProps";
import { ReactElement } from "react";
import { ModelDto } from "@/models/Shared/model-dto";

export default interface ReturnButtonForOpenCreateWindowFunction<TService extends CrudService<ModelDto, object, ModelDto> > {
  (service: TService): ReactElement<ButtonForOpenCreateModalWindowProps<TService>, any>;
}