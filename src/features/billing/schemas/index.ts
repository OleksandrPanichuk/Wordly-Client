import { FormErrors } from '@/constants'
import { zRequired } from '@/lib'
import { PhoneNumberUtil } from 'google-libphonenumber'
import { z } from 'zod'
const phoneNumberUtil = PhoneNumberUtil.getInstance()

export const billingInfoSchema = z.object({
	firstName: zRequired(FormErrors.required.firstName).min(
		3,
		FormErrors.length.firstName
	),
	lastName: zRequired(FormErrors.required.lastName).min(
		3,
		FormErrors.length.lastName
	),
	country: zRequired(FormErrors.required.country),
	city: zRequired(FormErrors.required.city),
	phoneNumber: zRequired(FormErrors.required.phoneNumber)
		.min(5, FormErrors.length.phoneNumber)
		.refine(
			(value) => {
				try {
					const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(`+${value}`)
					return phoneNumberUtil.isValidNumber(phoneNumber)
				} catch (error) {
					return false
				}
			},
			{ message: FormErrors.invalid.phoneNumber }
		),
	email: zRequired(FormErrors.required.email).email(FormErrors.invalid.email),
	address: zRequired(FormErrors.required.address).min(
		5,
		FormErrors.length.address
	),
	postalCode: zRequired(FormErrors.required.postalCode)
})
