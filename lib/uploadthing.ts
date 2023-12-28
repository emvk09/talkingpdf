// this is an custom hook from uploadthing docs
// this handles the upload logic in client side

import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
