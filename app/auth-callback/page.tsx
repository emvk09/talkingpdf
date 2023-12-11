import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

// auth-callback get triggered when the user logs in for the very first time.
export default function AuthCallBackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // get the search params from query string named origin
  const origin = searchParams.get("origin");

  const { data, isLoading } = trpc.authCallBack.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to database
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
  });
}
