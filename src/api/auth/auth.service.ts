import {
	ResetPasswordInput,
	SignInInput,
	SignUpInput,
	UpdatePasswordInput,
	resetPasswordSchema,
	signInSchema,
	signUpSchema,
	updatePasswordSchema
} from '@/api'
import { ApiRoutes } from '@/constants'
import { absoluteApiUrl, axios } from '@/lib'
import { TypeUser } from '@/types'
import { AxiosResponse } from 'axios'

const signInWithGoogle = async () => {
	window.location.href = absoluteApiUrl(ApiRoutes.AUTH.SIGN_IN_GOOGLE)
}

const signIn = async (input: SignInInput): Promise<AxiosResponse<TypeUser>> => {
	signInSchema.parse(input)
	return await axios.post(ApiRoutes.AUTH.SIGN_IN, input)
}

const signUp = async (input: SignUpInput): Promise<AxiosResponse<TypeUser>> => {
	signUpSchema.parse(input)
	return await axios.post(ApiRoutes.AUTH.SIGN_UP, input)
}

const signOut = async () => {
	return await axios.post(ApiRoutes.AUTH.SIGN_OUT, null)
}

const resetPassword = async (input: ResetPasswordInput) => {
	resetPasswordSchema.parse(input)
	return await axios.post(ApiRoutes.PASSWORD.RESET, input)
}
const updatePassword = async (input: UpdatePasswordInput) => {
	updatePasswordSchema.parse(input)
	return await axios.patch(ApiRoutes.PASSWORD.ROOT, input)
}

export const AuthApi = {
	signInWithGoogle,
	signIn,
	signUp,
	signOut,
	resetPassword,
	updatePassword
} as const
