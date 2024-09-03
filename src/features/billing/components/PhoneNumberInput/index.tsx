'use client'
import type { TypeBillingInfo } from '@/features/billing'
import { cn, getCountryCode } from '@/lib'
import { ControllerRenderProps } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

import type { BillingInfoInput } from '@/api'
import { useEffect, useState } from 'react'
import styles from './PhoneNumberInput.module.scss'

interface IPhoneNumberInputProps
	extends ControllerRenderProps<BillingInfoInput, 'phoneNumber'> {
	isInvalid?: boolean
	country?: string
	billingInfoFromDB?: TypeBillingInfo
}

export const PhoneNumberInput = ({
	disabled,
	isInvalid,
	country,
	value,
	billingInfoFromDB,
	onChange,
	...field
}: IPhoneNumberInputProps) => {
	const [phoneNumber, setPhoneNumber] = useState<string>(value ?? '')

	const handleChange = (value: string) => {
		setPhoneNumber(value)
		onChange(value)
	}

	useEffect(() => {
		if (
			country &&
			getCountryCode(country) === billingInfoFromDB?.country &&
			!phoneNumber &&
			billingInfoFromDB?.phoneNumber
		) {
			setPhoneNumber(billingInfoFromDB.phoneNumber)
		}
	}, [country, billingInfoFromDB, phoneNumber])

	return (
		<PhoneInput
			placeholder="Phone number"
			countryCodeEditable={false}
			country={getCountryCode(
				country ?? billingInfoFromDB?.country ?? ''
			)?.toLowerCase()}
			inputClass={cn(styles.input, isInvalid && styles.inputInvalid)}
			specialLabel={''}
			disabled={disabled || !country}
			value={phoneNumber}
			onChange={handleChange}
			{...field}
		/>
	)
}
