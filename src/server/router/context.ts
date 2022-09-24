// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../db/client";

type CreateContextOptions = Record<string, never>;

export const createContext = async (
  { req, res }: trpcNext.CreateNextContextOptions,
) => {
  return {
    prisma,
    req,
    res
  }
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
