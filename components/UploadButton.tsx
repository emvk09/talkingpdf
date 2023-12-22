"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
      <DialogContent>examplecontenr</DialogContent>
    </Dialog>
  );
}
