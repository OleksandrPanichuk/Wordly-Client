'use client'
import { Routes } from '@/constants'
import { authActions, AuthApi, SignUpInput } from '@/features/auth'
import { useMutation } from '@/hooks'
import { useAppActions } from '@/store'
import { TypeUser } from '@/types'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

export const useSignUpMutation = (
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
