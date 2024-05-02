import { APP_URL } from '@/shared/constants'
import baseAxios  from 'axios'


export const axios = baseAxios.create({
	baseURL: APP_URL + '/api',
	withCredentials:true,
})
