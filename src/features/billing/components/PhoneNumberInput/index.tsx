'use client'
import { BillingInfoInput } from '@/features/billing'
import { ControllerRenderProps } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

import styles from './PhoneNumberInput.module.scss'
import { cn } from '@/lib'

interface IPhoneNumberInputProps
	extends ControllerRenderProps<BillingInfoInput, 'phoneNumber'> {
	countryCode?: string
	isInvalid?: boolean
}

export const PhoneNumberInput = ({
	countryCode,
	disabled,
	isInvalid,
	...field
}: IPhoneNumberInputProps) => {
	return (
		<PhoneInput
			disabled={!countryCode}
			countryCodeEditable={false}
			country={countryCode?.toLowerCase()}
			placeholder="Phone number"
			inputClass={cn(styles.input, isInvalid && styles.inputInvalid)}
			specialLabel={''}
			{...field}
		/>
	)
}
