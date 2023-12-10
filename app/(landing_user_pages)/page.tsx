import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Hero section */}

      <MaxWidthWrapper className="mt-28 sm:mt-40 mb-12 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 px-2 py-2 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white shadow-md backdrop-blur transition-all hover:bg-white/50 hover:border-gray-300">
          <p className="text-sm font-semibold text-gray-700">
            talkingPDF is now public !
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold">
          Talk to your <span className="text-red-600">documents</span> in
          seconds
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:textlg">
          TalkingPDF allows you to have converstions with any PDF document.
          Simply upload your file and start asking questions right away.
        </p>
        <Link
          href="/dashboard"
          target="_blank"
          className={buttonVariants({
            size: "lg",
            variant: "default",
            className: "mt-5 rounded-xl",
          })}
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* Value proposition section */}

      <div className="relative isolate">
        {/* background design */}
        <div
          area-hidden="true"
          className="absolute inset-x-0 -top-40 sm:-top-80 -z-10 pointer-events-none transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative w-[36.125rem] sm:w-[72.187rem] left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>

        {/* product image */}
        <div className="mx-auto mt-16 sm:mt-24 px-6 lg:px-8 max-w-6xl flow-root">
          <div className="-m-2 lg:-m-4 p-2 lg:p-4 rounded-xl lg:rounded-2xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10">
            <Image
              src="/images/dashboard-preview.jpg"
              alt="product preview"
              width={1364}
              height={866}
              quality={100}
              priority
              className="p-2 sm:p-8 md:p-20 bg-white shadow-2xl rounded-md ring-1 ring-gray-900/10"
            />
          </div>
        </div>

        {/* background design */}
        <div
          area-hidden="true"
          className="absolute inset-x-0 -top-40 sm:-top-80 -z-10 pointer-events-none transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative w-[36.125rem] sm:w-[72.187rem] left-[calc(50%-13rem)] sm:left-[calc(50%-36rem)] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
      </div>

      {/* Feature section */}

      <div className="mx-auto mt-32 sm:mt-56 mb-32 max-w-5xl">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl sm:text-5xl text-gray-900">
              Start chatting instantly
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Chatting with your pdf files has neverbeen easier than with
              TalkingPDF
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="my-8 pt-8 space-y-4 md:space-x-12 md:space-y-0 md:flex">
          <li className="md:flex-1">
            <div className="py-2 pl-4 md:pl-0 md:pb-0 md:pt-4 flex flex-col space-y-2 border-l-4 md:border-l-0 md:border-t-2 border-zinc-300">
              <span className="text-sm font-medium text-red-700">Step 1</span>
              <span className="text-xl font-semibold ">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700">
                Either starting out with a free plan or choose our {""}
                <Link
                  href="/pricing"
                  className="text-blue-700 underline underline-offset-2"
                >
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="py-2 pl-4 md:pl-0 md:pb-0 md:pt-4 flex flex-col space-y-2 border-l-4 md:border-l-0 md:border-t-2 border-zinc-300">
              <span className="text-sm font-medium text-red-700">Step 2</span>
              <span className="text-xl font-semibold ">
                Upload your PDF file
              </span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your file and ready to make it chat with.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="py-2 pl-4 md:pl-0 md:pb-0 md:pt-4 flex flex-col space-y-2 border-l-4 md:border-l-0 md:border-t-2 border-zinc-300">
              <span className="text-sm font-medium text-red-700">Step 3</span>
              <span className="text-xl font-semibold ">
                Start asking questions
              </span>
              <span className="mt-2 text-zinc-700">
                It&apos;s that simple. Try out TalkingPDF today - it really
                takes less than a minute.
              </span>
            </div>
          </li>
        </ol>

        {/* product image */}
        <div className="mx-auto mt-16 sm:mt-24 px-6 lg:px-8 max-w-6xl flow-root">
          <div className="-m-2 lg:-m-4 p-2 lg:p-4 rounded-xl lg:rounded-2xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10">
            <Image
              src="/images/file-upload-preview.jpg"
              alt="uploading preview"
              width={1419}
              height={732}
              quality={100}
              priority
              className="p-2 sm:p-8 md:p-20 bg-white shadow-2xl rounded-md ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
