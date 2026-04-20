import * as z from "zod";

export const leadSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  // Coerce hata kar simple number rakhein
  budget: z.number().min(100, "Budget must be at least $100"), 
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]),
  notes: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;