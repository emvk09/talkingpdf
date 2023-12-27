"use client";

import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UploadButton from "@/components/UploadButton";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Dashboard() {
  const [currentDeletingFile, setCurrentDeletingFile] = useState<string | null>(
    null
  );

  // useUtils invalidates the previously done useQueries data cache in the component. So that they can be refetched again
  const utils = trpc.useUtils();

  // Get request for files
  const { data: files, isLoading } = trpc.getUserFiles.useQuery(); // here the data is just renamed to files

  // Delete request for files
  // here the mutate function is just renamed to deleteUserFile
  const { mutate: deleteUserFile } = trpc.deleteUserFile.useMutation({
    // id is automatically passed from mutate funtion to onMutate, And runs everytime we use the mutate funtion
    onMutate: ({ id }) => {
      setCurrentDeletingFile(id);
    },
    // onSuccess runs only when api request returns success
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    // onSettled runs even if api request fails
    onSettled: () => {
      setCurrentDeletingFile(null);
    },
  });

  const displayFiles = () => {
    return (
      <ul className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {files!
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((file) => (
            <li
              key={file.id}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg border border-1 border-gray-100"
            >
              <Link
                href={`/dashboard/${file.id}`}
                className="flex flex-col gap-2"
              >
                <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-zinc-200 to-neutral-200" />
                  <div className="flex-1 text-ellipsis overflow-hidden">
                    {/* "text-ellipsis overflow-hidden" is same as "truncate" */}
                    <h3 className="text-lg font-medium text-zinc-900 truncate">
                      {file.name}
                    </h3>
                  </div>
                </div>
              </Link>

              <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {format(new Date(file.createdAt), "MMM yyyy")}
                </div>

                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  mocked
                </div>

                <Button
                  onClick={() => deleteUserFile({ id: file.id })}
                  size="sm"
                  className="w-full"
                  variant="destructive"
                >
                  {currentDeletingFile === file.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </li>
          ))}
      </ul>
    );
  };

  const displayEmpty = () => {
    return (
      <div className="mt-16 flex flex-col items-center gap-2 text-zinc-400 select-none">
        <Ghost className="h-8 w-8 text-zinc-400" />
        <h3 className="font-semibold text-xl">Pretty empty around here</h3>
        <p>Lets&apos;s upload your first PDF</p>
      </div>
    );
  };

  const displayLoading = () => (
    <Skeleton height={60} className="my-2" count={6} enableAnimation />
  );

  return (
    <section>
      <MaxWidthWrapper>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-bold text-5xl text-gray-900">My files</h1>
          <UploadButton />
        </div>

        {/* Display all user files */}
        {files && files?.length !== 0
          ? displayFiles()
          : isLoading
          ? displayLoading()
          : displayEmpty()}
      </MaxWidthWrapper>
    </section>
  );
}
