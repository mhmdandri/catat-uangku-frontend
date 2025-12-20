import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

interface ModalDeleteProps {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}
const DialogDelete = ({
  description,
  title,
  open,
  onClose,
  onDelete,
  isLoading = false,
}: ModalDeleteProps) => {
  return (
    <>
      <AlertDialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen && !isLoading) onClose();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title || "Apakah kamu yakin mau hapus akun ini?"}
            </AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <AlertDialogCancel
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              Batal
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={onDelete}
                className="w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
                Hapus
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DialogDelete;
