import { useAuth } from '@/providers'
import { AuthApi } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useSignOut = () => {
	const router = useRouter()
	const { setUser } = useAuth()
	const { mutate, ...state } = useMutation({
		mutationFn: AuthApi.signOut,
		onSuccess: () => {
			router.refresh()
			setUser(null)
		},
		onError: () => {
			toast.error('Failed to sign out')
		},
	})

	return {
		...state,
		mutate: () => mutate(),
	}
}
