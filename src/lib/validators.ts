import { z } from 'zod'

export const zRequired = (message: string = 'This field is required') => {
	return z.string({ required_error: message }).trim().min(1, message)
}
