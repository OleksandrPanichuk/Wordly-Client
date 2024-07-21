'use client'
import baseAxios from 'axios'

import { APP_URL } from '@/shared/constants'
import { cookies } from 'next/headers'

export const axios = baseAxios.create({
	baseURL: APP_URL + '/api',
	withCredentials: true
})

axios.interceptors.request.use((config) => {
	config.headers.Cookie = cookies().toString()
	return config
})
