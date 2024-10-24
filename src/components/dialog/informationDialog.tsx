"use client";

import { DialogDescription } from "@radix-ui/react-dialog";
import { create } from "zustand";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export const useDialogStore = create(() => ({
  message: "",
  title: "",
  button: "",
}));

type Props = { message: string; title?: string; button?: string };

export const popup = ({ message, title, button }: Props) => {
  useDialogStore.setState({ message, title, button });
};

export function InformationDialog() {
  const dialogStore = useDialogStore();
  const handleButtonClick = () => {
    popup({ message: "" });
  };
  return (
    <Dialog
      open={dialogStore.message !== ""}
      onOpenChange={(o) => {
        if (!o) {
          popup({ message: "" });
        }
      }}
    >
      <DialogContent className="z-50 w-max sm:max-w-[80%]">
        <div className="flex flex-col items-center pr-8 pt-2">
          <DialogTitle>{dialogStore.title ?? "Information"}</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col items-center">
              <p className="whitespace-pre">{dialogStore.message}</p>
              <button
                onClick={handleButtonClick}
                type="button"
                className="button mt-5 px-5"
              >
                {dialogStore.button ?? "OK"}
              </button>
            </div>
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
