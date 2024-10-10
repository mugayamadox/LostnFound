import { z } from "zod";

export const itemSchema = z.object({
  itemType: z.enum(["lost", "found"], {
    required_error: "Please specify whether the item is lost or found",
  }),
  name: z.string().min(2, "Please provide a name for the item"),
  description: z
    .string()
    .min(10, "Please provide a detailed description of the item"),
  contact: z.string().min(5, "Please provide valid contact information"),
  location: z
    .string()
    .min(2, "Please specify where the item was lost or found"),
  picture: z.instanceof(File).optional(),
});

export type ItemFormData = z.infer<typeof itemSchema>;
