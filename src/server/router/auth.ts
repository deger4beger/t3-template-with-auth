import { createRouter } from "./context";
import { z } from "zod";

export const authRouter = createRouter()
  .query("getPermission", {
    input: z
      .object({
        email: z.string().email(),
        password: z.string()
      }),
    resolve({ input, ctx }) {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email
        }
      })
    },
  })