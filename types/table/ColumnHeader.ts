import {ReactNode} from "react";

export interface ColumnHeader {
    title: string;
    icon?: ReactNode;
}

export type ColumnHeaders<TModel extends object> = Partial<Record<keyof TModel, ColumnHeader>>;