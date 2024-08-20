import { FormErrors } from '@/constants'
import { zRequired } from '@/lib'
import { isStrongPassword } from 'validator'
import { z } from 'zod'

export const signInSchema = z.object({
	email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email),
	password: zRequired(FormErrors.required.password)
		.min(8, FormErrors.length.password)
		.refine(isStrongPassword, FormErrors.invalid.password)
})

export const signUpSchema = signInSchema
	.merge(
		z.object({
			username: zRequired(FormErrors.required.username),
			avatarUrl: z.string().url().optional(),
			confirmPassword: zRequired(FormErrors.required.confirmPassword)
		})
	)
	.refine(
		(data) => {
			return (
				!data.password ||
				!data.confirmPassword ||
				data.password === data.confirmPassword
			)
		},
		{
			message: FormErrors.match.passwords,
			path: ['confirmPassword']
		}
	)

export const resetPasswordSchema = z.object({
	email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email)
})

export const updatePasswordSchema = z
	.object({
		code: z.string().uuid(),
		password: zRequired(FormErrors.required.password)
			.min(8, FormErrors.length.password)
			.refine(isStrongPassword, FormErrors.invalid.password),
		confirmPassword: zRequired(FormErrors.required.confirmPassword)
	})
	.refine(
		(data) => {
			return (
				!data.password ||
				!data.confirmPassword ||
				data.password === data.confirmPassword
			)
		},
		{
			message: FormErrors.match.passwords,
			path: ['confirmPassword']
		}
	)

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
