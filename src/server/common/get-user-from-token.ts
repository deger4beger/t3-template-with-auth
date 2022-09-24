import type { GetServerSidePropsContext } from "next";
import { validateToken } from "../../utils/jwt";
import { prisma } from "../db/client";

export const getUserFromToken = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const accessToken = ctx.req.headers["authorization"];
  if (!accessToken) {
    return null;
  }

  const [scheme, token] = accessToken.split(/\s+/);
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null
  }

  let decodedToken: ReturnType<typeof validateToken>
  try {
    decodedToken = validateToken(token);
  } catch (error) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: decodedToken.email }
  });

  if (!user) {
      return null;
  }

  const { password, ...userOutput } = user;
  return userOutput;

};
