// this handles the upload logic in server side side

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // check if the user is authenticated for file upload
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
