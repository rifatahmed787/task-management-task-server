import { z } from 'zod'

export const create_task_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    deadline: z.string({ required_error: 'Deadline is required' }),
    description: z.string({ required_error: 'Description is required' }),
    cover_image: z.string().optional(),
    keynotes: z.array(z.string()).optional(),
  }),
})

export const update_task_zod_schema = z.object({
  body: z.object({
    title: z.string().optional(),
    deadline: z.string().optional(),
    description: z.string().optional(),
    cover_image: z.string().optional(),
    keynotes: z.array(z.string()).optional(),
  }),
})
