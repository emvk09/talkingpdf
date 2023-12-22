// this file initializes the tRPC backend server

import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const router = t.router;
// publicProcedure is the type for an api route that can be accessed by unauthenticated users
export const publicProcedure = t.procedure;
