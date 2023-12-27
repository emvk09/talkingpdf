import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PdfRenderer from "@/components/PdfRenderer";
import ChatWrapper from "@/components/ChatWrapper";

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
  try {
    const dbUser = await prismadb.user.findUnique({
      where: {
        kindeId: user?.id,
      },
    });
    if (!dbUser) {
      redirect(`/auth-callback?origin=dashboard/${fileId}`);
    }
  } catch (error) {
    throw new Error("Database error");
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
    throw new Error("Database error");
  }

  // 4rem is the height of the Navbar (h-14)
  return (
    <section className="flex-1 justify-between flex flex-col h-[calc(100vh-4rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer />
          </div>
        </div>

        {/* Right side */}
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </section>
  );
}
