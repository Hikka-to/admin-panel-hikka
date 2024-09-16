import jwt, {JwtPayload} from "jsonwebtoken";

interface SignOption {
    expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: "24h"
};

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
    const secret_key = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret_key!, options);
    return token;
}

export function decodeJwtToken(token: string): any {
    const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key
    try {
        const decoded = jwt.verify(token, secretKey!, {algorithms: ["HS256"]}) as any;

        // Check if the decoded token contains another JWT token under the "token" field
        if (typeof decoded.token === "string") {
            // Recursively call decodeJwtToken to decode the nested JWT token
            return decodeJwtToken(decoded.token);
        }

        // If there's no nested "token", return the decoded payload
        return decoded;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}

export function getToken(token: string): string | null {
    const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key
    try {
        const decoded = jwt.verify(token, secretKey!, {algorithms: ["HS256"]}) as any;

        if (typeof decoded.token === "string") {
            return getToken(decoded.token);
        }

        return token;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}

export function verifyJwt(token: string) {
    try {
        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret_key!);
        return decoded as string;
    } catch (error) {
        console.log(error);
        return null;
    }
}
