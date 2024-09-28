import { db } from "@/lib/db/db";

import { TodoFormSchemaType } from "../validators/validations";

export const getAllTodos = async () => {
  return db.todo.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getAllFinishedTodos = async () => {
  return db.todo.findMany({
    where: {
      completed: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getAllUnfinishedTodos = async () => {
  return db.todo.findMany({
    where: {
      completed: false,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const createTodo = async (todo: TodoFormSchemaType) => {
  return db.todo.create({
    data: {
      title: todo.title,
      description: todo.description,
      finishDate: todo.finishDate,
    },
  });
};

export const updateTodo = async (todo: TodoFormSchemaType) => {
  return db.todo.update({
    where: {
      id: todo.id,
    },
    data: {
      title: todo.title,
      description: todo.description,
      finishDate: todo.finishDate,
    },
  });
};

export const deleteTodo = async (id: number) => {
  return db.todo.delete({
    where: {
      id,
    },
  });
};

export const getTodoById = async (id: number) => {
  return db.todo.findUnique({
    where: {
      id,
    },
  });
};

export const setTodoStatus = async (id: number, status: boolean) => {
  return db.todo.update({
    where: {
      id,
    },
    data: {
      completed: status,
    },
  });
};

export const deleteAllDoneTodos = async () => {
  return db.todo.deleteMany({
    where: {
      completed: true,
    },
  });
};
