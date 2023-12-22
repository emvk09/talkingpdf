// this file is for creating an instance of tRPC for the client side, so that we can use it instead of fetch
// eg: trpc.any_api_procedure_name.useQuery(...,...)

import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server";

export const trpc = createTRPCReact<AppRouter>({});
