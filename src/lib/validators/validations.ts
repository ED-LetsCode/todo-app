import { z } from "zod";

export const TodoFormSchema = z.object({
  id: z.number().optional(),
  title: z
    .string({
      message: "Bitte geben Sie einen Titel ein",
      required_error: "Pflichtfeld *",
    })
    .min(3, {
      message: "Min. 3",
    })
    .max(100, {
      message: "Max. 100",
    }),
  description: z
    .string({
      message: "Bitte geben Sie eine Beschreibung ein",
      required_error: "Pflichtfeld *",
    })
    .min(3, {
      message: "Min. 3",
    })
    .max(1000, {
      message: "Max. 1000",
    }),
  finishDate: z.date().optional(),
});

export type TodoFormSchemaType = z.infer<typeof TodoFormSchema>;
