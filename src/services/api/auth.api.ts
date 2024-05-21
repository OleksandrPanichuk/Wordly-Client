import { axios } from '@/lib'
import {
	ResetPasswordInput,
	SignInInput,
	SignUpInput,
	UpdatePasswordInput,
	resetPasswordSchema,
	signInSchema,
	signUpSchema,
	updatePasswordSchema,
} from '@/services/dto'
import { TypeUser } from '@/shared/types'
import { AxiosResponse } from 'axios'

export class AuthApi {
	public static async signInWithGoogle() {
		window.location.href =
			process.env.NEXT_PUBLIC_API_URL! + '/api/auth/sign-in/google'
	}

	public static async signIn(
		input: SignInInput
	): Promise<AxiosResponse<TypeUser>> {
		signInSchema.parse(input)
		return await axios.post('/auth/sign-in', input)
	}

	public static async signUp(
		input: SignUpInput
	): Promise<AxiosResponse<TypeUser>> {
		signUpSchema.parse(input)
		return await axios.post('/auth/sign-up', input)
	}

	public static async signOut() {
		return await axios.post('/auth/sign-out', null)
	}

	public static async resetPassword(input: ResetPasswordInput) {
		resetPasswordSchema.parse(input)
		return await axios.post('/auth/password/reset', input)
	}

	public static async updatePassword(input: UpdatePasswordInput) {
		updatePasswordSchema.parse(input)
		return await axios.patch('/auth/password', input)
	}
}
