import { Metadata } from "next";
import prismadb from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  // params are the dynamic routes
  // eg: /dashboard/[fieldId]/page.tsx
  params: {
    fileId: string;
  };
  // searchParams are the query strings
  // eg: /dashboard?a=1&b=2 will have { a: '1', b: '2' }
  searchParams: {};
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: {
      // title.absolute ignores the title.template of RootLayout
      absolute: params.fileId,
    },
  };
}

export default async function Page({ params }: PageProps) {
  // retrive file id from params
  const { fileId } = params;

  // get the session of logged in user
  const { getUser } = getKindeServerSession();

  // Check if the user is already logged in the browser
  const user = await getUser();
  if (!user || !user.id) {
    redirect(`/auth-callback?origin=dashboard/${fileId}`);
  }

  // If logged in browser, also check the database for the user
  const dbUser = await prismadb.user.findUnique({
    where: {
      kindeId: user?.id,
    },
  });
  if (!dbUser) {
    redirect(`/auth-callback?origin=dashboard/${fileId}`);
  }

  // find the file from database
  try {
    const file = await prismadb.file.findFirst({
      where: {
        id: fileId,
        userId: user.id,
      },
    });
    if (!file) notFound();
  } catch (error) {
    notFound();
  }

  return (
    <section>
      <h1>{fileId}</h1>
    </section>
  );
}
