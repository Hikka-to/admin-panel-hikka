import Service from "./Service";
import { AxiosResponse } from "axios";
import { z, ZodType } from "zod";
import { ModelDto } from "@/models/Shared/model-dto";
import { FilterPaginationDto, filterPaginationDtoSchema } from "@/models/Dto/SharedDtos/filter-pagination-dto";
import { ReturnPageDto } from "@/models/Shared/return-page-dto";

export abstract class CrudService<
	TGetModelDto extends ModelDto,
	TCreateModelDto extends object,
	TUpdateModelDto extends ModelDto,
> extends Service {

	public modelName: string;
	public getDtoSchema: ZodType<TGetModelDto>;
	public createDtoSchema: ZodType<TCreateModelDto>;
	public updateDtoSchema: ZodType<TUpdateModelDto>;

	protected constructor(modelName: string, getDtoSchema: ZodType<TGetModelDto>, createDtoSchema: ZodType<TCreateModelDto>, updateDtoSchema: ZodType<TUpdateModelDto>) {
		super(modelName);
		this.modelName = modelName;
		this.getDtoSchema = getDtoSchema;
		this.createDtoSchema = createDtoSchema;
		this.updateDtoSchema = updateDtoSchema;
	}

	public async getAll(
		paginationDto: FilterPaginationDto
	): Promise<AxiosResponse<ReturnPageDto<TGetModelDto>>> {
		filterPaginationDtoSchema.parse(paginationDto);
		return this.axiosInstance.post(`${this.modelName}/GetAll`, { params: paginationDto });
	}

	public async getById(id: string): Promise<AxiosResponse<TGetModelDto>> {
		z.string().uuid().parse(id);
		return this.axiosInstance.get(`${id}`);
	}

	public async update(dto: TUpdateModelDto): Promise<AxiosResponse> {
		this.updateDtoSchema.parse(dto);
		return this.axiosInstance.put("", dto);
	}

	public async delete(id: string): Promise<AxiosResponse> {
		z.string().uuid().parse(id);
		return this.axiosInstance.delete(`${id}`);
	}

	public async create(dto: TCreateModelDto): Promise<AxiosResponse> {
		this.createDtoSchema.parse(dto);
		return this.axiosInstance.post("", dto);
	}
}
