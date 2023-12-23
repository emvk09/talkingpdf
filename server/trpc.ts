// this file initializes the tRPC backend server

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();

const middleware = t.middleware;
const isAuth = middleware(async (opts) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    // ctx means context. This helps to pass the additional values along with the actual api request as middlewares
    ctx: {
      kindeId: user.id,
    },
  });
});

export const router = t.router;
// publicProcedure is the type for an api route that can be accessed by unauthenticated users
export const publicProcedure = t.procedure;
// privateProcedure is the type for an api route that can be accessed by unauthenticated users
export const privateProcedure = t.procedure.use(isAuth);
