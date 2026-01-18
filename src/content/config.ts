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

const music = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    audio: z.string(),           // path to mp3, e.g. /audio/track.mp3
    order: z.number(),           // display order (lower = earlier)
    note: z.string().optional(), // creation note (time/place)
    draft: z.boolean().default(false),
  }),
});

export const collections = { writings, music };
