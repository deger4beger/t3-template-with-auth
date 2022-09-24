import { createRouter } from "./context";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { getSignedToken } from "../../utils/jwt";

const userValidator = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["STUDENT", "TEACHER"]),
  createdAt: z.date(),
});

export type User = z.infer<typeof userValidator>;

export const authRouter = createRouter()
  .query("signup", {
    input: z
      .object({
        email: z.string().email(),
        password: z.string().min(8).max(20),
        name: z.string().min(10).max(50),
        role: z.enum(["STUDENT", "TEACHER"]),
      }),
    output: z
      .object({
        userData: userValidator,
        jwt: z.string()
      }),
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