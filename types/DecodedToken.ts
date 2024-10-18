import { JwtPayload } from "jsonwebtoken";

export interface DecodedToken extends JwtPayload {
	nameid: string;
	unique_name: string;
	email: string;
	AspNetIdentitySecurityStamp: string;
	role: string;
	aud: string;
	iss: string;
	nbf: number;
	exp: number;
	iat: number;
}
