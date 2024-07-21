import { FormErrors } from '@/shared/constants'
import { z } from 'zod'

export const billingInfoSchema = z.object({
	firstName: z
		.string({ required_error: FormErrors.required.firstName })
		.trim()
		.min(1, FormErrors.required.firstName)
		.min(3, FormErrors.length.firstName),
	lastName: z
		.string({ required_error: FormErrors.required.lastName })
		.trim()
		.min(1, FormErrors.required.lastName)
		.min(3, FormErrors.length.lastName),
	country: z
		.string({ required_error: FormErrors.required.country })
		.trim()
		.min(1, FormErrors.required.country),
	city: z
		.string({ required_error: FormErrors.required.city })
		.trim()
		.min(1, FormErrors.required.city),
	phoneNumber: z
		.number({ required_error: FormErrors.required.phoneNumber })
		.min(1, FormErrors.required.phoneNumber)
		.min(5, FormErrors.length.phoneNumber),
	email: z
		.string({ required_error: FormErrors.required.email })
		.trim()
		.min(1, FormErrors.required.email)
		.email(FormErrors.invalid.email),
	address: z
		.string({ required_error: FormErrors.required.address })
		.trim()
		.min(1, FormErrors.required.address)
		.min(5, FormErrors.length.address),
	postalCode: z
		.string({ required_error: FormErrors.required.postalCode })
		.trim()
		.min(1, FormErrors.required.postalCode)
})
