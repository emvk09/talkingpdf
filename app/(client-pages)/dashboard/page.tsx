import { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import prismadb from "@/lib/prismadb";

export const metadata: Metadata = {
  title: "Dashboard",
  alternates: {
    canonical: "/dashboard",
  },
};

export default async function DashboardPage() {
  // get the session of logged in user
  const { getUser } = getKindeServerSession();

  // Check if the user is already logged in the browser
  const user = await getUser();
  if (!user || !user.id) {
    redirect("/auth-callback?origin=dashboard");
  }

  // If logged in browser, also check the database for the user
  try {
    const dbUser = await prismadb.user.findUnique({
      where: {
        kindeId: user?.id,
      },
    });
    if (!dbUser) {
      redirect("/auth-callback?origin=dashboard");
    }
  } catch (error) {
    throw new Error("Database error");
  }

  return (
    <section>
      <Dashboard />
    </section>
  );
}
