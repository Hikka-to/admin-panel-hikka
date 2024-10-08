import { UnknownKeysParam, z, ZodObject, ZodRawShape, ZodTypeAny } from "zod";

import { ModelDto } from "@/models/Shared/model-dto";
import {
  FilterPaginationDto,
  filterPaginationDtoSchema,
} from "@/models/Dto/SharedDtos/filter-pagination-dto";
import { ReturnPageDto } from "@/models/Shared/return-page-dto";
import { CreateResponseDto } from "@/models/ResponseDto/create-response-dto";

import Service from "./Service";

export abstract class CrudService<
  TGetModelDto extends ModelDto,
  TCreateModelDto extends object,
  TUpdateModelDto extends ModelDto,
> extends Service {
  public modelName: string;
  public getDtoSchema: ZodObject<
    ZodRawShape,
    UnknownKeysParam,
    ZodTypeAny,
    TGetModelDto
  >;
  public createDtoSchema: ZodObject<
    ZodRawShape,
    UnknownKeysParam,
    ZodTypeAny,
    TCreateModelDto
  >;
  public updateDtoSchema: ZodObject<
    ZodRawShape,
    UnknownKeysParam,
    ZodTypeAny,
    TUpdateModelDto
  >;

  protected constructor(
    getDtoSchema: ZodObject<
      ZodRawShape,
      UnknownKeysParam,
      ZodTypeAny,
      TGetModelDto
    >,
    createDtoSchema: ZodObject<
      ZodRawShape,
      UnknownKeysParam,
      ZodTypeAny,
      TCreateModelDto
    >,
    updateDtoSchema: ZodObject<
      ZodRawShape,
      UnknownKeysParam,
      ZodTypeAny,
      TUpdateModelDto
    >,
    modelName?: string,
  ) {
    super(modelName);
    this.modelName =
      modelName ?? this.constructor.name.replace(/^(.*?)(Service)?$/, "$1");
    this.getDtoSchema = getDtoSchema;
    this.createDtoSchema = createDtoSchema;
    this.updateDtoSchema = updateDtoSchema;
  }

  /**
   * @throws {ZodError} If the paginationDto is invalid
   * @throws {AxiosError} If the request fails
   */
  public async getAll(
    paginationDto: FilterPaginationDto,
  ): Promise<ReturnPageDto<TGetModelDto>> {
    return (
      await this.axiosInstance.post<ReturnPageDto<TGetModelDto>>(
        `GetAll`,
        filterPaginationDtoSchema.parse(paginationDto),
      )
    ).data;
  }

  /**
   * @throws {ZodError} If the id is invalid
   * @throws {AxiosError} If the request fails
   */
  public async getById(id: string): Promise<TGetModelDto> {
    return (await this.axiosInstance.get(`${z.string().uuid().parse(id)}`))
      .data;
  }

  /**
   * @throws {ZodError} If the dto is invalid
   * @throws {AxiosError} If the request fails
   */
  public async update(dto: TUpdateModelDto): Promise<void> {
    await this.axiosInstance.put("", this.updateDtoSchema.parse(dto));
  }

  /**
   * @throws {ZodError} If the id is invalid
   * @throws {AxiosError} If the request fails
   */
  public async delete(id: string): Promise<void> {
    await this.axiosInstance.delete(`${z.string().uuid().parse(id)}`);
  }

  /**
   * @throws {ZodError} If the dto is invalid
   * @throws {AxiosError} If the request fails
   */
  public async create(dto: TCreateModelDto): Promise<CreateResponseDto> {
    return (
      await this.axiosInstance.post<CreateResponseDto>(
        "",
        this.createDtoSchema.parse(dto),
      )
    ).data;
  }
}
