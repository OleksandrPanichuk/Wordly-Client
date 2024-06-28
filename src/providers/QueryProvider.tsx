'use client'
import {
	QueryClient,
	QueryClientProvider,
	isServer
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 60 * 1000
			}
		}
	})
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
	if (isServer) {
		return makeQueryClient()
	}

	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}

export const QueryProvider = ({ children }: PropsWithChildren) => {
	const queryClient = getQueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	)
}
