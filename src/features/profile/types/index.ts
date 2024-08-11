import { updateProfileSchema } from '@/features/profile'
import { z } from 'zod'

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
