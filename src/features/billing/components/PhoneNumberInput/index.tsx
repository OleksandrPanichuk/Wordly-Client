'use client'
import { type BillingInfoInput } from '@/features/billing'
import { cn } from '@/lib'
import type { TypeBillingInfo } from '@/types'
import { ControllerRenderProps } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

import { getCode } from 'country-list'
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
			country === billingInfoFromDB?.country &&
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
			country={getCode(country ?? billingInfoFromDB?.country ?? '')}
			inputClass={cn(styles.input, isInvalid && styles.inputInvalid)}
			specialLabel={''}
			disabled={disabled || !country}
			value={phoneNumber}
			onChange={handleChange}
			{...field}
		/>
	)
}
