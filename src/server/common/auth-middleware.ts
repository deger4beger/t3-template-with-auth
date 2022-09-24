import { TRPCError } from "@trpc/server";
import { User } from "../router/auth";
import type { Context } from "../router/context"

export const authMiddleware = (
  roles: User["role"][] = ["STUDENT", "TEACHER"]
) => ({
  ctx,
  next
}: {
  ctx: Context,
  next: () => Promise<void>
}) => {
  if (!ctx.user || !roles.includes(ctx.user?.role)) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next();
}