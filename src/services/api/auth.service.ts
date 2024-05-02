import { axios } from '@/lib'
import {
	ResetPasswordInput,
	UpdatePasswordInput,
	SignInInput,
	SignUpInput,
	resetPasswordSchema,
	updatePasswordSchema,
	signInSchema,
	signUpSchema,
} from '@/services/dto'
import { TypeUser } from '@/shared/types'
import { AxiosResponse } from 'axios'

class AuthApi {
	public async signInWithGoogle() {
		window.location.href =
			process.env.NEXT_PUBLIC_API_URL! + '/api/auth/sign-in/google'
	}

	public async signIn(input: SignInInput): Promise<AxiosResponse<TypeUser>> {
		signInSchema.parse(input)
		return await axios.post('/auth/sign-in', input)
	}

	public async signUp(input: SignUpInput): Promise<AxiosResponse<TypeUser>> {
		signUpSchema.parse(input)
		return await axios.post('/auth/sign-up', input)
	}

	public async signOut() {
		return await axios.post('/auth/sign-out', null)
	}

	public async resetPassword(input: ResetPasswordInput) {
		resetPasswordSchema.parse(input)
		return await axios.post('/auth/password/reset', input)
	}

	public async updatePassword(input: UpdatePasswordInput) {
		updatePasswordSchema.parse(input)
		return await axios.patch('/auth/password',input)
	}
}

export const AuthService = new AuthApi()
