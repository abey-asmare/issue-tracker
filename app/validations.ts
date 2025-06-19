import z from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export const urlSchema = z.object({
  id: z.coerce.number().int(),
});
