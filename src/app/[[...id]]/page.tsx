import { FC, Suspense } from "react";

import { revalidatePath } from "next/cache";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/Icons";

import {
  getAllFinishedTodos,
  getAllTodos,
  getAllUnfinishedTodos,
  getTodoById,
} from "@/lib/db/todos";

import { Todo } from "@prisma/client";

import DeleteAllDoneTodos from "./_components/DeleteAllDoneTodos";
import TodoCard from "./_components/TodoCard";
import TodoForm from "./_components/TodoForm";

export const dynamic = "force-dynamic";
export const noCache = "no-cache";
export const revalidate = 0;
interface PageProps {
  params?: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page: FC<PageProps> = async ({ params }) => {
  const id = Number(params?.id);

  let todo: Todo | null = null;
  if (id && !isNaN(id)) todo = await getTodoById(id);

  return (
    <div className="mt-4 flex h-full flex-col items-center space-y-8">
      <TodoForm todo={todo ?? undefined} />

      <Suspense
        fallback={Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-full rounded-md" />
        ))}
      >
        <Todos />
      </Suspense>
    </div>
  );
};

const Todos = async () => {
  const finishedTodos = await getAllFinishedTodos();
  const unFinishedTodos = await getAllUnfinishedTodos();

  return (
    <Accordion type="single" collapsible className="w-full pb-10">
      {finishedTodos.length > 0 && (
        <AccordionItem value="finishedTodos">
          <AccordionTrigger>
            Erledigte Aufgaben ({finishedTodos.length})
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-4">
            <DeleteAllDoneTodos />

            <div className="flex w-full flex-col gap-y-4">
              {finishedTodos.map((todo, index) => (
                <TodoCard key={index} todo={todo} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
      <AccordionItem value="unfinishedTodos">
        <AccordionTrigger>
          Offene Aufgaben ({unFinishedTodos.length})
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex w-full flex-col gap-y-4">
            {unFinishedTodos.map((todo, index) => (
              <TodoCard key={index} todo={todo} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Page;
