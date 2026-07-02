import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    // Blog posts live in content/blog/**. Custom frontmatter used across the
    // blog UI (date, category, image, tags) is declared so it is queryable and
    // typed. `title`/`description`/`body` are part of the built-in page schema.
    blog: defineCollection({
      type: "page",
      source: { include: "blog/**/*.md", prefix: "/blog" },
      schema: z.object({
        date: z.string().optional(),
        category: z.string().optional(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    // Docs come from the GitBook submodule mounted at content/docs/**.
    docs: defineCollection({
      type: "page",
      source: { include: "docs/**/*.md", prefix: "/docs" },
      schema: z.object({
        navTitle: z.string().optional(),
        image: z.string().optional(),
      }),
    }),
  },
});
