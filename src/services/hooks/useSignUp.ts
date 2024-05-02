'use client'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'
import { AuthService } from '@/services'
import { SignUpInput } from '@/services/dto'
import { TypeUser } from '@/shared/types'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useSignUp = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<TypeUser>, Error, SignUpInput>,
		'mutationFn'
	>
) => {
	const { setUser } = useAuth()
	return useMutation({
		...options,
		mutationFn: (input: SignUpInput) => AuthService.signUp(input),
		onSuccess: (response, ...rest) => {
			setUser(response.data)
			options?.onSuccess?.(response, ...rest)
		},
	})
}
