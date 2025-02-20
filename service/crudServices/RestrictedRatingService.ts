import { GetRestrictedRatingDto, getRestrictedRatingDtoSchema } from "@/models/Dto/WithSeoAddition/RestrictedRatings/get-restricted-rating-dto";
import { CrudService } from "../shared/CrudService";
import { CreateRestrictedRatingDto, createRestrictedRatingDtoSchema } from "@/models/Dto/WithSeoAddition/RestrictedRatings/create-restricted-rating-dto";
import { UpdateRestrictedRatingDto, updateRestrictedRatingDtoSchema } from "@/models/Dto/WithSeoAddition/RestrictedRatings/update-restricted-rating-dto";

export class RestrictedRatingService extends CrudService<
  GetRestrictedRatingDto,
  CreateRestrictedRatingDto,
  UpdateRestrictedRatingDto
> {
  public constructor() {
    super(getRestrictedRatingDtoSchema, createRestrictedRatingDtoSchema, updateRestrictedRatingDtoSchema, "RestrictedRating");
  }
}

