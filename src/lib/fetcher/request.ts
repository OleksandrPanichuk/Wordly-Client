'use server'
import { APP_URL } from '@/shared/constants'
import { cookies } from 'next/headers'
import type { FetchConfig, FetchResponse } from './types'

export async function request<T>(
	method: string,
	url: string,
	config?: FetchConfig & { body?: any }
): Promise<FetchResponse<T>> {
	const headers = {
		'Content-Type': 'application/json',
		Cookie: cookies().toString(),
		...config?.headers
	}
	const body = config?.body

	let fullURL = APP_URL + '/api' + url

	if (config?.params) {
		const queryString = new URLSearchParams(config.params).toString()
		fullURL += `?${queryString}`
	}

	const options: RequestInit = {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
		cache: config?.cache,
		next: config?.next
	}

	try {
		const response = await fetch(fullURL, options)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return {
			data,
			status: response.status,
			statusText: response.statusText,
			headers: response.headers
		}
	} catch (error) {
		throw error
	}
}
