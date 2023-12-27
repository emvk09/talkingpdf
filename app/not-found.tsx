import Link from "next/link";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "404 | talkingPDF",
};

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <AlertCircle className="w-6 h-6 text-red-500 bg-red-50 rounded-full" />
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            404 <br /> Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn&apos;t exist.
          </p>

          <div className="flex items-center justify-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Link
              href="/"
              className={buttonVariants({
                size: "lg",
                variant: "destructive",
                className: "mt-5 rounded-xl",
              })}
            >
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
