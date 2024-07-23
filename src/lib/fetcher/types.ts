export interface FetchOptions {
	headers?: Record<string, any>
	params?: Record<string, any>
	next?: NextFetchRequestConfig
	cache?: RequestCache
}

export interface RequestOptions extends FetchOptions {
	body?: any
}