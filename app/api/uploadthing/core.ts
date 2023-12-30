// this handles the upload logic in server side side

import prismadb from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // check if the user is authenticated for file upload
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }
      return { userId: user.id };
    })

    // the returned data from middleware is the metadata in the onUploadComplete
    .onUploadComplete(async ({ metadata, file }) => {
      await prismadb.file.create({
        data: {
          key: file.key,
          name: file.name,
          // using "url: file.url" results in timeout,
          url: `https://uploadthing.prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING",
          userId: metadata.userId,
        },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
