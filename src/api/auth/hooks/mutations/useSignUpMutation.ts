'use client'
import { AuthApi, type SignUpInput } from '@/api'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'
import { TypeUser } from '@/types'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useSignUpMutation = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<TypeUser>, Error, SignUpInput>,
		'mutationFn'
	>
) => {
	const { setUser } = useAuth()
	return useMutation({
		...options,
		mutationFn: AuthApi.signUp,
		onSuccess: (response, ...rest) => {
			setUser(response.data)
			options?.onSuccess?.(response, ...rest)
		}
	})
}
