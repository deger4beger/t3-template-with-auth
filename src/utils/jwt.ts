import * as jwt from "jsonwebtoken";
import { prisma } from "../server/db/client";

type User = typeof prisma.user;

export function getSignedToken(user: any) {
    return jwt.sign(
        getTokenPayload(user),
        process.env.JWT_SECRET!,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    )
}

export function validateToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & ReturnType<typeof getTokenPayload>
}

function getTokenPayload(user: any) {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    }
}