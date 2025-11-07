import { z } from "zod";

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  type: z.string(),
  category: z.string(),
  status: z.string(),
  date: z.string(), // ou z.date() se você quiser converter automaticamente
  updated: z.string(),
  thumbnail: z.string(), //.optional() fica string | never[]
  gallery: z.array(z.string()),
  short_description: z.string(),
  tags: z.array(z.string()),

  links: z.object({
    demo: z.string().optional(),
    github: z.string().optional(),
    documentation: z.string().optional(),
  }),

  team: z.array(z.string()),

  context: z.string(),
  objectives: z.array(z.string()),
  challenges: z.string(),
  learned: z.string(),
  references: z.array(z.string()),
});