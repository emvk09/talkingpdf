// this file creates router instance (appRouter) with all the procedures, i.e:(api calls)
// later, this tRPC router instance need to be connected with Next.js appRouter (api/trpc/[trpc]/route.ts)

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import prismadb from "@/lib/prismadb";

export const appRouter = router({
  // API routes

  getAuthCallBack: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // check whether user logged in the browser
    if (!user?.id || !user?.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // check if user is in database
    const dbUser = await prismadb.user.findUnique({
      where: {
        kindeId: user.id,
      },
    });

    // if there is no user, then create a new user
    if (!dbUser) {
      await prismadb.user.create({
        data: {
          kindeId: user.id,
          name: user.given_name,
          email: user.email,
        },
      });
    }
    return { success: true };
  }),

  // getCheckUserInDb: publicProcedure.query(async ({email}) => {
  //   const dbUser = await prismadb.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });
  //   if (!dbUser) {
  //     return new TRPCError({ code: "NOT_FOUND" });
  //   }
  //   return { success: true };
  // }),

  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { kindeId } = ctx;

    return await prismadb.file.findMany({
      where: {
        userId: kindeId,
      },
    });
  }),
});

export type AppRouter = typeof appRouter;
