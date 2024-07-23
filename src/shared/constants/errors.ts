export const FormErrors = {
	required: {
		any: 'This field is required',
		firstName: 'First name is required',
		lastName: 'Last name is required',
		country: 'Country is required',
		city: 'City is required',
		address: 'Address is required',
		postalCode: 'Postal code is required',
		phoneNumber: 'Phone number is required',
		email: 'Email is required',
		username:'Username is required',
		password: 'Password is required',
		confirmPassword:'Please, confirm your password',
	},
	length: {
		firstName: 'First name is too short',
		lastName: 'Last name is too short',
		address: 'Address must be at least 5 characters',
		postalCode: 'Postal code must be at least 5 characters',
		phoneNumber: 'Your phone number must be at least 5 characters',
		password: 'Password is too short'
	},
	invalid: {
		email: 'Invalid email address',
		password: 'Password is too weak',
		phoneNumber: 'Invalid phone number'
	},
	match: {
		passwords: 'Passwords do not match'
	}
} as const
