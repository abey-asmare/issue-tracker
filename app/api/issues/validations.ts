import z from "@/node_modules/zod/dist/types/v3/external";

export const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});
