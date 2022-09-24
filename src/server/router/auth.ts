import { createRouter } from "./context";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { getSignedToken } from "../../utils/jwt";

const userOutput = z.object({
  userData: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    role: z.enum(["STUDENT", "TEACHER"]),
    createdAt: z.string(),
  }),
  jwt: z.string(),
})

export type User = z.infer<typeof userOutput>

export const authRouter = createRouter()
  .query("signup", {
    input: z
      .object({
        email: z.string().email(),
        password: z.string().min(8).max(20),
        name: z.string().min(10).max(50),
        role: z.enum(["STUDENT", "TEACHER"]),
      }),
    output: userOutput,
    async resolve({ input, ctx }) {
      const userPayload = {
        ...input,
        password: await bcrypt.hash(input.password, 10)
      };
      const { password, ...user } = await ctx.prisma.user.create({ data: userPayload });
      return {
        userData: user,
        jwt: getSignedToken(user)
      }
    },
  })