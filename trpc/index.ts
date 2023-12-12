// this file initializes main router instance, commonly referred to as appRouter
// lastly, we need to export the type of the router which we'll later use on the client side

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  // API routes

  authCallBack: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    // check whether user logged in the application
    if (!user?.id || !user?.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // check if user is in database

    // return true when the user is already in the database
    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
