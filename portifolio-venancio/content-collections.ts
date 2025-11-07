import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import { Post } from './src/content/schemas/post.schema'
import { projectSchema } from './src/content/schemas/project.schema'


// const projectSchema = z.object({
//   title: z.string(),
//   slug: z.string(),
//   topics: z.array(
//     z.object({
//       id: z.string(),
//       title: z.string(),
//       summary: z.string(),
//     })
//   ),
//   featuredTopicIds: z.array(z.string()),
// });

// export type Project = z.infer<typeof projectSchema>;

const projects = defineCollection({
  name: "projects",
  directory: "src/content/projects",
  include: "**/*.md",
  schema: projectSchema
});
 
export default defineConfig({
  collections: [Post, projects],
});