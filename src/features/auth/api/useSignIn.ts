'use client'
import { useMutation } from '@/hooks'
import { AuthApi } from '@/services'
import { SignInInput } from '@/services/dto'
import { Routes } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import { useAppActions } from '@/store'
import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { authActions } from '../store'

export const useSignIn = (
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
