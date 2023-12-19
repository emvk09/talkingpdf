// this file initializes main router instance, commonly referred to as appRouter
// lastly, we need to export the type of the router which we'll later use on the client side

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const appRouter = router({
  // API routes

  authCallBack: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // check whether user logged in the browser
    if (!user?.id || !user?.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // check if user is in database
    // we write db.user instead of db.User becz schemas are lowercase in mongodb
    const dbUser = await db.user.findFirst({
      where: {
        kindeId: user.id,
      },
    });

    // if there is no user, then create a new user
    if (!dbUser) {
      await db.user.create({
        data: {
          name: user.given_name,
          email: user.email,
          kindeId: user.id,
        },
      });
    }

    // return true when the user is already in the database
    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
