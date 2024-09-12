"use client";

import { useMutation } from "@/hooks"
import { WordsApi } from "@/api"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdateWordMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: WordsApi.update,
		onSuccess: (_, variables) => {

			queryClient.invalidateQueries({
				queryKey: ['word-by-id', {id: variables.id}]
			})

			queryClient.invalidateQueries({
				queryKey: ['word-by-name', variables.name]
			})

			queryClient.removeQueries({
				queryKey: ['words']
			})

			queryClient.removeQueries({
				queryKey: ['dictionary-search']
			})

			toast.success('Word successfully updated!')
		}
	})
}