"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Dropzone from "react-dropzone";
import { CloudIcon, File, Loader2 } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";

const DropzoneUploadArea = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const router = useRouter();

  // this is the custom hook from uploadthing imported from lib
  const { startUpload } = useUploadThing("pdfUploader");

  // destructure toast notification function
  const { toast } = useToast();

  // get request for checking pdf upload info (polling approach)
  const { mutate: startPolling } = trpc.getUploadFileInfo.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    // we are polling the server until we get success
    retry: true,
    retryDelay: 500,
  });

  const startSimulatedProgress = () => {
    // clear any previous progress state
    setUploadProgress(0);

    // setInterval is like a loop which executes automatically after the specified time. they will continue to execute until clearInteral is called
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        } else {
          return prev + 5;
        }
      });
    }, 500);
    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        // this will start the setInterval function
        const progressInterval = startSimulatedProgress();

        // handle file uploading using uploadthing hook
        const res = await startUpload(acceptedFile);
        if (!res) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        }

        // res is an array of objects
        // we are taking the 1st array element (object) and assigning it to an variable fileResponse
        // if we wanted to destructure the 2nd element, => const [, fileResponse] = res;
        const [fileResponse] = res;
        const key = fileResponse?.key;
        if (!key) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        }

        // after file upload is complete, clear the interval
        clearInterval(progressInterval);
        setUploadProgress(100);

        // even though we get the key from the fileResponse of uploadthing, it still doesnt ensure that the file is uploaded successfully
        // so we need to do polling approach to the backend
        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudIcon className="h-6 w-6 text-zinc-500 mb-2" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-zinc-500 tracking-wider">
                  PDF (up to 4MB)
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    indicatorColor={
                      uploadProgress === 100 ? "bg-green-500" : ""
                    }
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="pt-2 flex gap-1 items-center justify-center text-sm text-zinc-700 text-center">
                      <Loader2 className="h3 w-3 animate-spin " />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default function UploadButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(vis) => {
        if (!vis) {
          setIsOpen(vis);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {/* by default Dialog Trigger is itself a button. asChild property makes this button property invalid so that we can make the custom button */}
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <DropzoneUploadArea />
      </DialogContent>
    </Dialog>
  );
}
