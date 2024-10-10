import { z } from "zod";

export const itemSchema = z.object({
  itemType: z.enum(["lost", "found"], {
    required_error: "Please specify whether the item is lost or found",
  }),
  name: z
    .string()
    .min(2, "Please provide a name for the item (at least 2 characters)"),
  description: z
    .string()
    .min(
      10,
      "Please provide a detailed description of the item (at least 10 characters)"
    ),
  contact: z
    .string()
    .min(5, "Please provide valid contact information (at least 5 characters)"),
  location: z
    .string()
    .min(
      2,
      "Please specify where the item was lost or found (at least 2 characters)"
    ),
  picture: z.instanceof(File).optional(),
});

export type ItemFormData = z.infer<typeof itemSchema>;
