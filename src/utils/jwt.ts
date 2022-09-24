import * as jwt from "jsonwebtoken";
import { User } from "../server/router/auth";

export function getSignedToken(user: User) {
    return jwt.sign(
        getTokenPayload(user),
        process.env.JWT_SECRET!,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
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