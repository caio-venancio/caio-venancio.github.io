import { defineCollection } from "@content-collections/core";
import { z } from "zod";

export const Post = defineCollection({
  name: "posts",
  directory: "src/content/posts",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
});