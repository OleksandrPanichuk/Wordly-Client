'use client'
import { AuthApi } from '@/api'
import { useAuth } from '@/providers'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useSignOutMutation = () => {
	const router = useRouter()
	const { removeUser } = useAuth()

	const { mutate, ...state } = useMutation({
		mutationFn: AuthApi.signOut,
		onSuccess: () => {
			router.refresh()
			removeUser()
		},
		onError: () => {
			toast.error('Failed to sign out')
		}
	})

	return {
		...state,
		mutate: () => mutate()
	}
}
