
import baseAxios from 'axios'

import { absoluteApiUrl } from '@/lib'

export const axios = baseAxios.create({
	baseURL: absoluteApiUrl(),
	withCredentials: true,
})