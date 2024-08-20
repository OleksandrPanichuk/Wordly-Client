'use client'
import { AuthApi, type SignInInput } from '@/api'
import { authActions } from '@/features/auth'
import { useMutation } from '@/hooks'
import { useAppActions } from '@/store'
import { TypeUser } from '@/types'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useSignInMutation = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<TypeUser>, Error, SignInInput>,
		'mutationFn'
	>
) => {
	const { setUser } = useAppActions(authActions)

	return useMutation({
		...options,
		mutationFn: AuthApi.signIn,
		onSuccess: (response, ...rest) => {
			setUser(response.data)
			options?.onSuccess?.(response, ...rest)
		}
	})
}
