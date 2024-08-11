'use client'
import { Routes } from '@/constants'
import { authActions, AuthApi, SignInInput } from '@/features/auth'
import { useMutation } from '@/hooks'
import { useAppActions } from '@/store'
import { TypeUser } from '@/types'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

export const useSignInMutation = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<TypeUser>, Error, SignInInput>,
		'mutationFn'
	>
) => {
	const { setUser } = useAppActions(authActions)
	const router = useRouter()

	return useMutation({
		...options,
		mutationFn: AuthApi.signIn,
		onSuccess: (response, ...rest) => {
			setUser(response.data)
			options?.onSuccess?.(response, ...rest)
			router.push(Routes.ROOT)
		}
	})
}
