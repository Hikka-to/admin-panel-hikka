import { ReactElement } from "react";
import ButtonForOpenViewDetailsModalWindowProps from "./ButtonForOpenViewDetailModalWindowProps";
import { ModelDto } from "@/models/Shared/model-dto";


export default interface ReturnButtonForOpenViewDetailWindowFunction<TGetModelDto extends ModelDto> {
  (model: TGetModelDto): ReactElement<ButtonForOpenViewDetailsModalWindowProps<TGetModelDto>, any>;
}