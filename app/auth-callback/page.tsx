"use client";

// auth-callback always triggers in two cases
// Case 1: If user is not logged in the browser
// Case 2: If user is logged in browser but not existing in database (usually after signup)

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // get the search params from query string named origin
  const origin = searchParams.get("origin");

  // Get request
  trpc.getAuthCallBack.useQuery(undefined, {
    onSuccess: (data) => {
      if (data.success) {
        // user is synced to database, navigate then back to dashboard
        router.push(origin ? origin : "/dashboard");
      }
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in");
      }
    },

    retry: false,
    // after 500 ms we again check is the user is in db
    // retryDelay: 500,
  });

  return (
    <section>
      <div className="w-full mt-24 flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl ">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </section>
  );
}
