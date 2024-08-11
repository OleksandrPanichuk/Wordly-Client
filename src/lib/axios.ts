
import baseAxios from 'axios'

import { absoluteApiUrl } from './utils'

export const axios = baseAxios.create({
	baseURL: absoluteApiUrl(),
	withCredentials: true,
})