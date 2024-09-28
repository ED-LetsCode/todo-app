import { db } from "../db";

export const clearDatabase = async () => {
  try {
    console.log("Clearing database... 🧹");
    // Example: await db.article.deleteMany();

    console.log("✅  Database cleared!");
    console.log("-----------------------\n\n");
  } catch (error) {
    console.log("❌  Error while clearing database!");
    console.log(error);
  }
};

const addTodos = async () => {
  try {
    console.log("Adding todos... 🚀");
    // Example: await db.todo.create({ data: { title: "Your todo title" } });

    const todos: {
      title: string;
      description: string;
    }[] = Array.from({ length: 20 }).map((_, index) => ({
      title: `Todo ${index + 1}`,
      description: `Description for Todo ${index + 1}`,
    }));

    await db.todo.createMany({
      data: todos,
    });

    console.log("✅  Todos added!");
    console.log("-----------------------\n\n");
  } catch (error) {
    console.log("❌  Error while adding todos!");
    console.log(error);
  }
};

/**
 * Seed function to call the article seeding process.
 */
const seed = async () => {
  // To only clear the database, uncomment the following line
  await clearDatabase();
  await addTodos();
};

seed();
