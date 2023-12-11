import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // check the database if the user info is already in the database or not

  // if the user is logged in for the first time (after register), it means the user info is not in the database
  // then, this 'if' condition will be executed
  // storing or syncing user details will take place in auth-callback page
  if (!user || !user.id) {
    redirect("/auth-callback?origin=dashboard");
  }

  return (
    <section>
      <h1>{user?.email}</h1>
    </section>
  );
}
