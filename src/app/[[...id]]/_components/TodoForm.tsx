"use client";

import { FC } from "react";

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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/Icons";

import {
  TodoFormSchema,
  TodoFormSchemaType,
} from "@/lib/validators/validations";
import { cn } from "@/lib/utils";

import { Todo } from "@prisma/client";

import { CreateTodo_Action, UpdateTodo_Action } from "@/actions/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { deAT } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface TodoFormProps {
  todo?: Todo;
}

const TodoForm: FC<TodoFormProps> = ({ todo }) => {
  const router = useRouter();
  const form = useForm<TodoFormSchemaType>({
    resolver: zodResolver(TodoFormSchema),
    defaultValues: {
      id: todo?.id ?? undefined,
      title: todo?.title ?? "",
      description: todo?.description ?? "",
      finishDate: todo?.finishDate ?? undefined,
    },
  });

  const onsubmit = async (data: TodoFormSchemaType) => {
    let res: ActionReturnType<null> | null = null;

    if (data.id) {
      // update todo
      res = await UpdateTodo_Action(data);
    } else {
      // create todo
      res = await CreateTodo_Action(data);
    }

    if (res?.message) {
      router.push("/");

      return toast.success(res.message);
    }

    return toast.error(res?.error);
  };

  const handleFormReset = (e: any) => {
    e.preventDefault();
    form.reset({
      id: undefined,
      title: "",
      description: "",
      finishDate: undefined,
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="spaw-full flex w-full flex-col gap-y-4 rounded-md border p-4"
      >
        <div className="border-b pb-2">
          <h1 className="text-xl font-bold">
            {todo ? "Aufgabe bearbeiten" : "Aufgabe hinzufügen"}
          </h1>

          <p className="text-sm text-muted-foreground">
            {todo
              ? "Bearbeite die Aufgabe und speichere die Änderungen"
              : "Füge eine neue Aufgabe hinzu und speichere sie"}
          </p>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titel</FormLabel>
              <FormControl>
                <Input placeholder="Wohnung aufräumen ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="..."
                  {...field}
                  className="max-h-[350px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="finishDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Abschlussdatum{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd.MM.yyyy")
                      ) : (
                        <span>Wähle ein Datum</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={deAT}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Wähle ein Datum für den Abschluss dieser Aufgabe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-row gap-x-2">
          <Button
            type="submit"
            className="w-1/6"
            variant="outline"
            onClick={(e) => {
              handleFormReset(e);
            }}
          >
            <Icons.reset className="size-5" />
          </Button>
          <Button type="submit" className="w-full">
            <Icons.send className="mr-2 size-4" />
            {todo ? "Speichern" : "Hinzufügen"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TodoForm;
