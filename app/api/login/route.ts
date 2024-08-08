// Import necessary types and services
import {decodeJwtToken, signJwtAccessToken} from '@/lib/jwtTokenUtils';
import {UserLoginDto} from '@/models/Dto/Users/user-login-dto';
import UserService from '@/service/UserService';
import { NextResponse } from 'next/server';

// Define the POST handler for the login route
export async function POST(body: Request) {

    const model: UserLoginDto = await body.json();
    const user = await UserService.loginUser(model);

    if (user.status == 200) {
        const accessToken = signJwtAccessToken(user.data);
        const decodeToken = decodeJwtToken(accessToken);


        const result = {
            accessToken,
            ...decodeToken
        };


        return new Response(JSON.stringify(result));
    } else return NextResponse.json({error: "invalid credentials" }, {status: 401});
}