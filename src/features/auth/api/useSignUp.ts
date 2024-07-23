'use client'
import { authActions, AuthApi, SignUpInput } from '@/features/auth'
import { useMutation } from '@/hooks'
import { Routes } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import { useAppActions } from '@/store'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

export const useSignUp = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<TypeUser>, Error, SignUpInput>,
		'mutationFn'
	>
) => {
	const { setUser } = useAppActions(authActions)
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
