import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  })
  .query("test", {
    input: z.object({
      test: z.number()
    }),
    async resolve({ input, ctx }) {
      const data = await ctx.prisma.example.findFirst()
      return {
        ...data,
        test: input.test
      }
    }
  })
