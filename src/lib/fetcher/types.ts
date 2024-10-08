import { AxiosHeaders } from "axios"

export interface FetchResponse<T> {
	data: T
	status: number
	statusText: string
	headers: Headers
}

export interface FetchConfig {
	headers?: AxiosHeaders
	next?: NextFetchRequestConfig
	cache?: RequestCache
	params?: Record<string, any>
}

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
