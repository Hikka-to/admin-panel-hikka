import { FilterPaginationDto } from "@/models/Dto/SharedDtos/filter-pagination-dto";
import Service from "./Service";
import { ReturnPageDto } from "@/models/Shared/return-page-dto";
import { AxiosResponse } from "axios";
import { ModelDto } from "@/models/Shared/model-dto";

export abstract class CrudService<
  GetModelDto extends ModelDto,
  CreateModelDto,
  UpdateModelDto extends ModelDto,
> extends Service {


  public async getAll(
    paginationDto: FilterPaginationDto
  ): Promise<AxiosResponse<ReturnPageDto<GetModelDto>>> {
    return this.axiosInstance.get("", { params: paginationDto });
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

  public async create(dto: CreateModelDto): Promise<AxiosResponse> 
  {
    return this.axiosInstance.post("", dto);
  }
}
