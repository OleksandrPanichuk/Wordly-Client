import baseAxios from 'axios'

import { APP_URL } from '@/shared/constants'

export const axios = baseAxios.create({
	baseURL: APP_URL + '/api',
	withCredentials: true
})
