import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <MaxWidthWrapper className="mt-28 sm:mt-40 mb-12 flex flex-col items-center justify-center text-center">
      <div className="mx-auto mb-4 px-2 py-2 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border-gray-200 bg-white shadow-md backdrop-blur transition-all hover:bg-white/50 hover:border-gray-300">
        <p className="text-sm font-semibold text-gray-700">
          TalkingPDF is now public !
        </p>
      </div>
      <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold">
        Talk to your <span className="text-red-600">documents</span> in seconds
      </h1>
      <p className="mt-5 max-w-prose text-zinc-700 sm:textlg">
        TalkingPDF allows you to have converstions with any PDF document. Simply
        upload your file and start asking questions right away.
      </p>
      <Link
        href="/dashboard"
        target="_blank"
        className={buttonVariants({
          size: "lg",
          className: "mt-5 rounded-xl",
        })}
      >
        Get started <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </MaxWidthWrapper>
  );
}
