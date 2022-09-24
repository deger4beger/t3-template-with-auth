import { createRouter } from "./context";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { getSignedToken } from "../../utils/jwt";
import { TRPCError } from "@trpc/server";

const userValidator = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["STUDENT", "TEACHER"]),
  createdAt: z.date(),
});

export type User = z.infer<typeof userValidator>;

export const authRouter = createRouter()
  .mutation("signup", {
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
      }
      const { password, ...user } = await ctx.prisma.user.create({ data: userPayload });
      return {
        userData: user,
        jwt: getSignedToken(user)
      }
    },
  })
  .mutation("signin", {
    input: z
      .object({
        email: z.string().email(),
        password: z.string().min(8).max(20),
      }),
    output: z
      .object({
        userData: userValidator,
        jwt: z.string()
      }),
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.user.findUnique({ where: { email: input.email } });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const passwordMatch = await bcrypt.compare(input.password, user.password);
      if (!passwordMatch) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      const { password, ...userOutput } = user
      return {
        userData: userOutput,
        jwt: getSignedToken(userOutput)
      };
    }
  })