"use client";

import { FC } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

import { DeleteAllDoneTodos_Action } from "@/actions/todo";
import { toast } from "sonner";

interface DeleteAllDoneTodosProps {}

const DeleteAllDoneTodos: FC<DeleteAllDoneTodosProps> = ({}) => {
  const handleDelete = async () => {
    const res = await DeleteAllDoneTodos_Action();
    if (res?.message) {
      return toast.success(res.message);
    }

    return toast.error(res?.error);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">
          <Icons.trash className="mr-2 h-4 w-4" />
          Alle erledigten Aufgaben löschen
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Sind Sie sicher, dass Sie alle erledigten Aufgaben löschen möchten?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Diese Aktion kann nicht rückgängig gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Icons.x className="mr-2 h-4 w-4" />
            Abbrechen
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            <Icons.trash className="mr-2 h-4 w-4" />
            Löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAllDoneTodos;
