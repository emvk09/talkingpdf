import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import prismadb from "@/lib/prismadb";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Check if the user is already logged in the browser
  if (!user || !user.id) {
    redirect("/auth-callback?origin=dashboard");
  }

  // If logged in browser, also check the database for the user
  const dbUser = await prismadb.user.findUnique({
    where: {
      kindeId: user?.id,
    },
  });

  // If the user is logged in browser but not in Database (this will be the case after signup)
  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard");
  }

  return <Dashboard />;
}
