import { isStrongPassword } from '@/lib'
import { z } from 'zod'

export const signInSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Invalid email'),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, 'Password is too short')
		.refine(password => isStrongPassword(password), 'Password is too weak'),
})

export const signUpSchema = signInSchema
	.merge(
		z.object({
			username: z
				.string({ required_error: 'Username is required' })
				.refine(username => !!username, 'Username is required'),
			avatarUrl: z.string().url().optional(),
			confirmPassword: z
				.string({ required_error: 'Please, confirm your password' })
				.refine(confPass => !!confPass, 'Please, confirm your password'),
		})
	)
	.refine(
		data => {
			return (
				!data.password ||
				!data.confirmPassword ||
				data.password === data.confirmPassword
			)
		},
		{
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		}
	)

export const resetPasswordSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Invalid email address'),
})

export const updatePasswordSchema = z
	.object({
		code: z.string().uuid(),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, 'Password is too short')
			.refine(password => isStrongPassword(password), 'Password is too weak'),
		confirmPassword: z
			.string({ required_error: 'Please, confirm your password' })
			.refine(confPass => !!confPass, 'Please, confirm your password'),
	})
	.refine(
		data => {
			return (
				!data.password ||
				!data.confirmPassword ||
				data.password === data.confirmPassword
			)
		},
		{
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		}
	)

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
