import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    kind: z.enum(["client", "university"]).default("client"),
    // Most important first: the homepage only shows the first few.
    stack: z.array(z.string()),
    role: z.string(),
    type: z.string(),
    timeline: z.string(),
    outcomes: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
  }),
});

export const collections = { projects };
