'use client'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'
import { AuthApi } from '@/services'
import { SignInInput } from '@/services/dto'
import { Routes } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

export const useSignIn = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<TypeUser>, Error, SignInInput>,
		'mutationFn'
	>
) => {
	const { setUser } = useAuth()
	const router = useRouter()

	return useMutation({
		...options,
		mutationFn: AuthApi.signIn,
		onSuccess: (response, ...rest) => {
			setUser(response.data)
			options?.onSuccess?.(response, ...rest)
			router.push(Routes.ROOT)
		},
	})
}
