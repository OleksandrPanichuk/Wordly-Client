'use client'

import { useMutation } from '@/hooks'
import { WordsApi } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateWordMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: WordsApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['words']
			})

			queryClient.removeQueries({
				queryKey: ['dictionary-search']
			})

			toast.success('Word successfully created!')
		}
	})
}
