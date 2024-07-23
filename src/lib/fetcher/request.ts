'use server'
import { cookies } from 'next/headers'
import type { RequestOptions } from './types'

export async function request<T>(
	method: string,
	url: string,
	options: RequestOptions = {},
): Promise<T> {
	'use server'
	const {
		headers = {},
		body,
		params,
		...restOptions
	} = options

	headers.Cookie = cookies().toString()

	// Construct the full URL with query parameters if provided
	let fullURL = `${process.env.NEXT_PUBLIC_APP_URL}/api/${url}`
	if (params) {
		const queryString = new URLSearchParams(params).toString()
		fullURL += `?${queryString}`
	}

	// Set up the request options
	const fetchOptions: RequestInit = {
		method,
		headers,
		...restOptions
	}

	if (body) {
		fetchOptions.body = JSON.stringify(body)
		;(fetchOptions.headers as Headers).set('Content-Type', 'application/json')
	}

	try {
		const response = await fetch(fullURL, fetchOptions)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		return await response.json()
	} catch (error) {
		throw error
	}
}
