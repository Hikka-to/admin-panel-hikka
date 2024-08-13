import Service from "./Service";
import { AxiosResponse } from "axios";
import { FilterPaginationDto, ModelDto, ReturnPageDto } from "hikka-ts-dtos";

export abstract class CrudService<
	GetModelDto extends ModelDto,
	CreateModelDto,
	UpdateModelDto extends ModelDto,
> extends Service {

    public ModelName: string;

    protected constructor(modelName:string )
    {
        super(process.env.NEXT_PUBLIC_BASE_URL as string);
        this.ModelName = modelName;

    }


    public async getAll(
        paginationDto: FilterPaginationDto
    ): Promise<AxiosResponse<ReturnPageDto<GetModelDto>>> {
        return this.axiosInstance.post(`${this.ModelName}/GetAll`, {params: paginationDto});
    }

	public async getById(id: number): Promise<AxiosResponse<GetModelDto>> {
		return this.axiosInstance.get(`${id}`);
	}

	public async update(dto: UpdateModelDto): Promise<AxiosResponse> {
		return this.axiosInstance.put("", dto);
	}

	public async delete(id: number): Promise<AxiosResponse> {
		return this.axiosInstance.delete(`${id}`);
	}

	public async create(dto: CreateModelDto): Promise<AxiosResponse> {
		return this.axiosInstance.post("", dto);
	}
}
