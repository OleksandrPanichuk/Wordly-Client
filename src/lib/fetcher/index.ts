import { isServer } from '@tanstack/react-query'
import { axios } from '../axios'
import { request } from './request'
import type { FetchConfig, FetchResponse } from './types'

class Fetcher {

	public async get<T>(url: string, options?: FetchConfig): Promise<T> {
		if (isServer) {
			return (await request<T>('GET', url, options)).data
		}

		return (await axios.get<T>(url, options)).data
	}

	public async getOrNull<T>(
		url: string,
		options?: FetchConfig
	): Promise<T | null> {
		if (isServer) {
			try {
				return (await request<T>('GET', url, options)).data
			} catch {
				return null
			}
		}

		return (await axios.get<T>(url, options)).data
	}

	public async getOrDefault<T>(
		url: string,
		defaultValue: T,
		options?: FetchConfig
	): Promise<T> {
		if (isServer) {
			try {
				return (await request<T>('GET', url, options)).data
			} catch {
				return defaultValue
			}
		}

		return (await axios.get<T>(url, options)).data
	}

	public post<T>(
		url: string,
		body: any,
		options: FetchConfig = {}
	): Promise<FetchResponse<T>> {
		return request<T>('POST', url, { ...options, body })
	}

	public patch<T>(
		url: string,
		body: any,
		options: FetchConfig = {}
	): Promise<FetchResponse<T>> {
		return request<T>('PATCH', url, { ...options, body })
	}

	public put<T>(
		url: string,
		body: any,
		options: FetchConfig = {}
	): Promise<FetchResponse<T>> {
		return request<T>('PUT', url, { ...options, body })
	}

	public delete<T>(
		url: string,
		options?: FetchConfig
	): Promise<FetchResponse<T>> {
		return request<T>('DELETE', url, options)
	}
}

export const fetcher = new Fetcher()
