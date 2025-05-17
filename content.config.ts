import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: {
        include: '*/projects/*.md',
        exclude: ['**/.*']
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        endDate: z.string().optional(),
        cover: z.string().optional(),
        tags: z.array(z.string()).optional(),
        link: z.string().optional(),
        top: z.boolean().default(false).optional(),
        draft: z.boolean().default(false).optional(),
        weight: z.number().optional(),
        no_ai: z.boolean().default(false).optional(),
        abbrlink: z.string().length(8).optional(),
      }),
    })
  }
})
