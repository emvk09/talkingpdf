import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/trpc";

// this means that, we are assigning type safety for all api routes in the client side
// the type of api routes is imported from trpc config folder
export const trpc = createTRPCReact<AppRouter>({});
