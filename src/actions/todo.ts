"use server";

import { revalidatePath } from "next/cache";

import {
  createTodo,
  deleteAllDoneTodos,
  deleteTodo,
  setTodoStatus,
  updateTodo,
} from "@/lib/db/todos";
import { TodoFormSchemaType } from "@/lib/validators/validations";

export const CreateTodo_Action = async (
  todo: TodoFormSchemaType,
): Promise<ActionReturnType<null>> => {
  try {
    await createTodo(todo);
    revalidatePath("/");
    return {
      message: "Aufgabe erfolgreich erstellt",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Ein Fehler ist aufgetreten. Aufgabe konnte nicht erstellt werden",
    };
  }
};

export const UpdateTodo_Action = async (
  todo: TodoFormSchemaType,
): Promise<ActionReturnType<null>> => {
  try {
    await updateTodo(todo);
    revalidatePath("/");
    return {
      message: "Aufgabe erfolgreich aktualisiert",
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Ein Fehler ist aufgetreten. Aufgabe konnte nicht aktualisiert werden",
    };
  }
};

export const DeleteTodo_Action = async (
  id: number,
): Promise<ActionReturnType<null>> => {
  try {
    await deleteTodo(id);
    revalidatePath("/");
    return {
      message: "Aufgabe erfolgreich gelöscht",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Ein Fehler ist aufgetreten. Aufgabe konnte nicht gelöscht werden",
    };
  }
};

export const SetTodoStatus_Action = async (
  id: number,
  status: boolean,
): Promise<ActionReturnType<null>> => {
  try {
    await setTodoStatus(id, status);
    revalidatePath("/");
    return {
      message: "Aufgabe erfolgreich aktualisiert",
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Ein Fehler ist aufgetreten. Aufgabe konnte nicht aktualisiert werden",
    };
  }
};

export const DeleteAllDoneTodos_Action = async (): Promise<
  ActionReturnType<null>
> => {
  try {
    await deleteAllDoneTodos();
    revalidatePath("/");
    return {
      message: "Alle erledigten Aufgaben erfolgreich gelöscht",
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Ein Fehler ist aufgetreten. Aufgaben konnten nicht gelöscht werden",
    };
  }
};
