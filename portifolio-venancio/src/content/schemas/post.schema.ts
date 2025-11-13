import { defineCollection } from "@content-collections/core";
import { z } from "zod";

export const Post = defineCollection({
  name: "posts",
  directory: "src/content/posts",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    type: z.string(),

    thumbnail: z.string().default(""),

    short_description: z.string(),

    tags: z.array(z.string()).default([]),

    links: z.object({
      demo: z.string().default(""),
      github: z.string().default(""),
      documentation: z.string().default(""),
    }),
  }),
});
