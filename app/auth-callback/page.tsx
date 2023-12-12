import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

// auth-callback get triggered when the user logs in for the very first time.
export default function AuthCallBackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // get the search params from query string named origin
  const origin = searchParams.get("origin");

  // this is the get fetch request in tRPC
  const { data, isLoading } = trpc.authCallBack.useQuery(undefined, {
    onSuccess: (data) => {
      if (data.success) {
        // user is synced to database, navigate then back to dashboard
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
  });
}
