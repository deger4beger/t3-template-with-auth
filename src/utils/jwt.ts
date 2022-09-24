import * as jwt from "jsonwebtoken";
import { User } from "../server/router/auth";

export function getSignedToken(user: User, refresh=false) {
    return jwt.sign(
        getTokenPayload(user),
        refresh ? process.env.JWT_REFRESH_SECRET! : process.env.JWT_ACCESS_SECRET!,
        {
            expiresIn: refresh ? process.env.JWT_REFRESH_EXPIRES_IN : process.env.JWT_ACCESS_EXPIRES_IN,
        }
    );
};

export function validateToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & ReturnType<typeof getTokenPayload>;
};

function getTokenPayload(user: User) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};