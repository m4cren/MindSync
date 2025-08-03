import z from "zod";

export const TaskSchema = z.object({
   label: z.string().min(3).max(50),
   category: z.string().min(2).max(20),
   date: z.string(),
});
