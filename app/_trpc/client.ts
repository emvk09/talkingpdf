// this file is for creating an instance of tRPC for the client side
// tRPC assigns type safety to all API routes in the client side

import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/trpc";

export const trpc = createTRPCReact<AppRouter>({});
// Now, instead of using fetch, tRPC is used to do api request from client side.
