import { isStrongPassword } from '@/lib'
import { FormErrors } from '@/shared/constants'
import { z } from 'zod'

export const signInSchema = z.object({
	email: z
		.string({ required_error: FormErrors.required.email })
		.trim()
		.min(1, FormErrors.required.email)
		.email(FormErrors.invalid.email),
	password: z
		.string({ required_error: FormErrors.required.password })
		.min(8, FormErrors.length.password)
		.refine(
			(password) => isStrongPassword(password),
			FormErrors.invalid.password
		)
})

export const signUpSchema = signInSchema
	.merge(
		z.object({
			username: z
				.string({ required_error: FormErrors.required.username })
				.trim()
				.min(1, FormErrors.required.username),
			avatarUrl: z.string().url().optional(),
			confirmPassword: z
				.string({ required_error: FormErrors.required.confirmPassword })
				.trim()
				.min(1, FormErrors.required.confirmPassword)
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
	email: z
		.string({ required_error: FormErrors.required.email })
		.trim()
		.min(1, FormErrors.required.email)
		.email(FormErrors.invalid.email)
})

export const updatePasswordSchema = z
	.object({
		code: z.string().uuid(),
		password: z
			.string({ required_error: FormErrors.required.password })
			.trim()
			.min(1, FormErrors.required.password)
			.min(8, FormErrors.length.password)
			.refine(
				(password) => isStrongPassword(password),
				FormErrors.invalid.password
			),
		confirmPassword: z
			.string({ required_error: FormErrors.required.confirmPassword })
			.trim()
			.min(1, FormErrors.required.confirmPassword)
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
