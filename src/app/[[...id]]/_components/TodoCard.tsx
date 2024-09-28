"use client";

import { FC, useState } from "react";

import { useRouter } from "next/navigation";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/Icons";

import { cn } from "@/lib/utils";

import { Todo } from "@prisma/client";

import { DeleteTodo_Action, SetTodoStatus_Action } from "@/actions/todo";
import { format } from "date-fns";
import { toast } from "sonner";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: FC<TodoCardProps> = ({ todo }) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onCheckedChange = async (id: number, checked: boolean) => {
    if (isPending) return;

    setIsPending(true);
    const res = await SetTodoStatus_Action(id, checked);
    setIsPending(false);

    if (res?.message) {
      return toast.success(res.message);
    }

    return toast.error(res?.error);
  };

  return (
    <Card className={cn("w-full")}>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-x-2">
          {todo.finishDate && !todo.completed && (
            <Badge
              className={cn(
                "max-w-fit",
                // If the todo has a finish date and the finish date is in the future set green background
                new Date(todo?.finishDate) > new Date() && "bg-green-500",

                // If the todo has a finish date and the finish date is today set yellow background
                new Date(todo?.finishDate) === new Date() && "bg-yellow-500",

                // If the todo has a finish date and the finish date is in the past set red background
                new Date(todo?.finishDate) < new Date() && "bg-red-500",
              )}
            >
              {format(todo.finishDate, "dd.MM.yyyy")}
            </Badge>
          )}

          {todo.completed && (
            <Badge className="max-w-fit bg-green-500">Erledigt</Badge>
          )}
        </div>

        <CardTitle className="flex items-center justify-between gap-x-4 text-lg">
          {todo.title}
        </CardTitle>
        <CardDescription>{todo.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4 pb-2">
        <div className="flex flex-row border-b pb-2">
          <div className="flex flex-row items-center">
            <Checkbox
              id={`todo-${todo.id}`}
              className="mr-2"
              checked={todo.completed}
              disabled={isPending}
              onCheckedChange={(checked) => onCheckedChange(todo.id, !!checked)}
            />
            <label htmlFor={`todo-${todo.id}`} className="cursor-pointer">
              Erledigt
            </label>
          </div>

          <div className="flex w-full flex-row items-end justify-end gap-x-2">
            <Button
              className="p-2"
              variant="outline"
              onClick={() => {
                router.push(`/${todo.id}`);
                router.refresh();
              }}
            >
              <Icons.edit className="size-5" />
            </Button>

            <DeleteTodo todo={todo} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-y-4">
        <div className="flex flex-col gap-y-1 text-xs text-muted-foreground">
          <p>Erstellt: {format(todo.createdAt, "dd.MM.yyyy hh:mm")}</p>
          <p>
            Zuletzt bearbeitet: {format(todo.updatedAt, "dd.MM.yyyy hh:mm")}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

interface DeleteTodoProps {
  todo: Todo;
}

const DeleteTodo: FC<DeleteTodoProps> = ({ todo }) => {
  const handleDelete = async (id: number) => {
    const res = await DeleteTodo_Action(id);
    if (res?.message) {
      return toast.success(res.message);
    }

    return toast.error(res?.error);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="p-2" variant="destructive">
          <Icons.trash className="size-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Möchten Sie die Aufgabe wirklich löschen?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Die Aufgabe{" "}
            <span className="font-semibold">{`"${todo.title}"`}</span> wird
            unwiderruflich gelöscht. Dieser Vorgang kann nicht rückgängig
            gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Icons.x className="mr-2 size-4" />
            Abbrechen
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDelete(todo.id);
            }}
          >
            <Icons.trash className="mr-2 size-4" />
            Löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TodoCard;
