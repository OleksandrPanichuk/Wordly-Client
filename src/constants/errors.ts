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
		username: 'Username is required',
		password: 'Password is required',
		confirmPassword: 'Please, confirm your password',
		nativeLanguage: 'Language is required',
		word :{
			name:"Word name is required"
		},
		meaning: {
			definition: 'Definition is required'
		}
	},
	length: {
		firstName: 'First name is too short',
		lastName: 'Last name is too short',
		address: 'Address must be at least 5 characters long',
		postalCode: 'Postal code must be at least 5 characters long',
		phoneNumber: 'Your phone number must be at least 5 characters long',
		password: 'Password is too short',
		meaning: {
			definition: 'Definition is too short'
		},
		word :{
			name: 'Word name is too short',
			transcription: 'Transcription must be at least 3 characters long'
		}
	},
	invalid: {
		email: 'Invalid email address',
		password: 'Password is too weak',
		phoneNumber: 'Invalid phone number',
		wordName: 'Invalid word name',
		partOfSpeech: 'Invalid part of speech',
		word: {
			transcription: 'Provide at least one transcription'
		},
		meaning: {
			examples: {
				word: 'Each example must contain at least one word'
			}
		}
	},
	match: {
		passwords: 'Passwords do not match'
	}
} as const
