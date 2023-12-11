import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  // here we write all the api routes of our application

  authCallBack: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    // check whether user logged in
    if (!user?.email || !user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // check is  the useris in database
    return { success: true };
  }),
});
export type AppRouter = typeof appRouter;
