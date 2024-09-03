'use client'
import { ProfileApi } from '@/api'
import { Routes } from '@/constants/routes'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'
import { TypeUser } from '@/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Options = {
	onSuccess?: (data: TypeUser) => void
}

export const useUpdateProfileMutation = ({ onSuccess }: Options = {}) => {
	const { setUser } = useAuth()
	const router = useRouter()

	return useMutation({
		mutationFn: ProfileApi.update,
		onSuccess: ({ data }) => {
			onSuccess?.(data)

			toast.success('Profile was successfully updated')
			setUser(data)
			router.push(Routes.PROFILE)
		}
	})
}
