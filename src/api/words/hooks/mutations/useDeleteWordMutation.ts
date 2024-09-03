'use client'

import { WordsApi } from '@/api'
import { useMutation } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteWordMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: WordsApi.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['words']
			})

			queryClient.removeQueries({
				queryKey: ['dictionary-search']
			})

			toast.success('Word successfully deleted!')
		}
	})
}
