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
        top: z.boolean().optional(),
        draft: z.boolean().optional(),
        weight: z.number().optional(),
        ai: z.boolean().optional(),
        abbrlink: z.string().length(8).optional(),
      }),
    })
  }
})
