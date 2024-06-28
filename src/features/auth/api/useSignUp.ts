'use client'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'
import { AuthApi } from '@/services'
import { SignUpInput } from '@/services/dto'
import { Routes } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

export const useSignUp = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<TypeUser>, Error, SignUpInput>,
		'mutationFn'
	>
) => {
	const { setUser } = useAuth()
	const router = useRouter()
	return useMutation({
		...options,
		mutationFn: AuthApi.signUp,
		onSuccess: (response, ...rest) => {
			setUser(response.data)
			options?.onSuccess?.(response, ...rest)
			router.push(Routes.ROOT)
		}
	})
}
