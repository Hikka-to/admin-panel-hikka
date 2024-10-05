import { ReactNode } from "react";

export interface ColumnInfo {
  render?: (value: any) => ReactNode;
}

export type ColumnInfos<TModel extends object> = Partial<
  Record<keyof TModel, ColumnInfo>
>;
