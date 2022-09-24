// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getUserFromToken } from "../common/get-user-from-token";
import { prisma } from "../db/client";

export const createContext = async (
  ctx: trpcNext.CreateNextContextOptions,
) => {

  const user = await getUserFromToken(ctx);

  return {
    user,
    prisma,
    req: ctx.req,
    res: ctx.res
  }
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
