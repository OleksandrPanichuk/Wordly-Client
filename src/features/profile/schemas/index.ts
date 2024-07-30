import { FormErrors } from '@/shared/constants'
import { Gender } from '@/shared/types'
import { z } from 'zod'

export const updateProfileSchema = z.object({
	username: z
		.string({ required_error: FormErrors.required.username })
		.trim()
		.min(1, FormErrors.required.username),
	gender: z.nativeEnum(Gender).optional(),
	nativeLanguages: z
		.array(z.string().trim().min(1, FormErrors.length.nativeLanguages))
		.optional(),
	avatar: z.instanceof(File).optional(),
})
