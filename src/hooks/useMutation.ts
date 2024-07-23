'use client'
import {
	UseMutationOptions,
	useMutation as useMutationDefault
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

interface IUseMutationProps<T, U> extends UseMutationOptions<T, Error, U> {}

export const useMutation = <T, U>(options?: IUseMutationProps<T, U>) => {
	return useMutationDefault({
		...options,
		onError: (error, ...rest) => {
			options?.onError?.(error, ...rest)
			if (error instanceof AxiosError) {
				const message = error.response?.data.message
				if (Array.isArray(message)) {
					message.forEach((msg) => toast.error(msg))
					return
				}
				if (message) {
					return toast.error(message)
				}
			}

			if (error instanceof ZodError) {
				return toast.error(error.message)
			}

			return toast.error('Something went wrong')
		}
	})
}
