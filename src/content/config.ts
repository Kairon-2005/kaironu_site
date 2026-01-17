import { defineCollection, z } from 'astro:content';

const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writings };
