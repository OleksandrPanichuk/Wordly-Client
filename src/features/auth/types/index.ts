import {
	resetPasswordSchema,
	signInSchema,
	signUpSchema,
	updatePasswordSchema
} from '@/features/auth'
import { z } from 'zod'

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
