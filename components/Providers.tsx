"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { HTTPBatchLinkOptions, httpBatchLink } from "@trpc/client";

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.TRPC_BATCH_LINK,
        } as HTTPBatchLinkOptions),
        // HTTPBatchLinkOptions is used only for specifying types since we used env variables
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {/* to use react query independently of trpc, we wrap the children inside QueryClientProvider */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
