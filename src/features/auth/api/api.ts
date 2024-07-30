import {
	ResetPasswordInput,
	SignInInput,
	SignUpInput,
	UpdatePasswordInput,
	resetPasswordSchema,
	signInSchema,
	signUpSchema,
	updatePasswordSchema
} from '@/features/auth'
import { absoluteApiUrl, axios } from '@/lib'
import { ApiRoutes } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import { AxiosResponse } from 'axios'

export class AuthApi {
	public static async signInWithGoogle() {
		window.location.href = absoluteApiUrl(ApiRoutes.AUTH.SIGN_IN_GOOGLE)
	}

	public static async signIn(
		input: SignInInput
	): Promise<AxiosResponse<TypeUser>> {
		signInSchema.parse(input)
		return await axios.post(ApiRoutes.AUTH.SIGN_IN, input)
	}

	public static async signUp(
		input: SignUpInput
	): Promise<AxiosResponse<TypeUser>> {
		signUpSchema.parse(input)
		return await axios.post(ApiRoutes.AUTH.SIGN_UP, input)
	}

	public static async signOut() {
		return await axios.post(ApiRoutes.AUTH.SIGN_OUT, null)
	}

	public static async resetPassword(input: ResetPasswordInput) {
		resetPasswordSchema.parse(input)
		return await axios.post(ApiRoutes.PASSWORD.RESET, input)
	}

	public static async updatePassword(input: UpdatePasswordInput) {
		updatePasswordSchema.parse(input)
		return await axios.patch(ApiRoutes.PASSWORD.ROOT, input)
	}
}
