import { request } from './request'
import type { FetchConfig, FetchResponse } from './types'

// Fetcher is used to make request inside of server action or components

class Fetcher {
	private request: typeof request

	constructor() {
		this.request = request
	}

	public get<T>(url: string, options?: FetchConfig): Promise<FetchResponse<T>> {
		return this.request<T>('GET', url, options)
	}

	public post<T>(
		url: string,
		body: any,
		options: FetchConfig = {}
	): Promise<FetchResponse<T>> {
		return this.request<T>('POST', url, { ...options, body })
	}

	public patch<T>(
		url: string,
		body: any,
		options: FetchConfig = {}
	): Promise<FetchResponse<T>> {
		return this.request<T>('PATCH', url, { ...options, body })
	}

	public put<T>(
		url: string,
		body: any,
		options: FetchConfig = {}
	): Promise<FetchResponse<T>> {
		return this.request<T>('PUT', url, { ...options, body })
	}

	public delete<T>(
		url: string,
		options?: FetchConfig
	): Promise<FetchResponse<T>> {
		return this.request<T>('DELETE', url, options)
	}
}

export const fetcher = new Fetcher()
