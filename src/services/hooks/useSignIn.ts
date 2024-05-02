'use client'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'
import { AuthService } from '@/services'
import { SignInInput } from '@/services/dto'
import { TypeUser } from '@/shared/types'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useSignIn = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<TypeUser>, Error, SignInInput>,
		'mutationFn'
	>
) => {
	const { setUser } = useAuth()

	return useMutation({
		...options,
		mutationFn: (input: SignInInput) => AuthService.signIn(input),
		onSuccess: (response, ...rest) => {
			setUser(response.data)
			options?.onSuccess?.(response, ...rest)
		},
	})
}
