import { FormErrors } from '@/constants/errors'
import { zRequired } from '@/lib'
import { Gender } from '@/types'
import { z } from 'zod'

export const updateProfileSchema = z.object({
	username: zRequired(FormErrors.required.username),
	gender: z.nativeEnum(Gender).optional(),
	nativeLanguage: z.string().optional(),
	avatar: z.instanceof(File).or(z.string()).optional()
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
