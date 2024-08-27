'use client'
import { AuthApi, type SignInInput } from '@/api'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'
import { TypeUser } from '@/types'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useSignInMutation = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<TypeUser>, Error, SignInInput>,
		'mutationFn'
	>
) => {
	const { setUser } = useAuth()

	return useMutation({
		...options,
		mutationFn: AuthApi.signIn,
		onSuccess: (response, ...rest) => {
			setUser(response.data)
			options?.onSuccess?.(response, ...rest)
		}
	})
}
