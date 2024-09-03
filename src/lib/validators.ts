import { isMongoId } from 'validator'
import { z } from 'zod'

export const zRequired = (message: string = 'This field is required') => {
	return z.string({ required_error: message }).trim().min(1, message)
}

export const zMongoId = ({
	message_invalid = 'Invalid id',
	message_required = 'This field is required'
}: { message_invalid?: string; message_required?: string } = {}) => {
	return z
		.string({ required_error: message_required })
		.refine(isMongoId, { message: message_invalid })
}
