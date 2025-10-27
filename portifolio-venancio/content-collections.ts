import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
 
const posts = defineCollection({
  name: "posts",
  directory: "src/content/posts",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
});

const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  topics: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      summary: z.string(),
    })
  ),
  featuredTopicIds: z.array(z.string()),
});

// export type Project = z.infer<typeof projectSchema>;

const projects = defineCollection({
  name: "projects",
  directory: "src/content/projects",
  include: "**/*.md",
  schema: projectSchema
});
 
export default defineConfig({
  collections: [posts, projects],
});