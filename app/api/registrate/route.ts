import {UserRegistrationDto} from "@/models/Dto/Users/user-registration-dto";
import UserService from "@/service/UserService";


export async function POST(params: Request) {
    const model: UserRegistrationDto = await params.json();
    const user = await UserService.registerUser(model);

    return user;
}