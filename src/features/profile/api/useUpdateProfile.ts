"use client"
import { authActions } from '@/features/auth'
import {useMutation} from '@/hooks'
import { useAppActions } from '@/store'
import { ProfileApi } from './api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Routes } from '@/shared/constants'

export const useUpdateProfile = () => {
	const {setUser}  = useAppActions(authActions)
	const router = useRouter()

	return useMutation({
		mutationFn: ProfileApi.update,
		onSuccess: ({data}) => {
			toast.success('Profile was successfully deleted')
			setUser(data)
			router.push(Routes.PROFILE)
		}
	})
}