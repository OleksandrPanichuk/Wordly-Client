'use client'
import { BillingInfoInput } from '@/features/billing'
import { cn, getCountryCode, getCountryNames } from '@/lib'
import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions
} from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import styles from './CountrySelect.module.scss'

type TypeCountrySelectProps = ControllerRenderProps<
	BillingInfoInput,
	'country'
> & {
	isInvalid?: boolean
}

export const CountrySelect = ({
	value,
	name,
	onBlur,
	onChange,
	ref,
	isInvalid,
	disabled
}: TypeCountrySelectProps) => {
	const countries = getCountryNames().sort()

	const [query, setQuery] = useState<string>('')
	const [selected, setSelected] = useState<string>('')

	const handleChange = (value: string) => {
		if (value) {
			setSelected(value)
			onChange(value)
		}
	}

	useEffect(() => {
		if (!selected && value) {
			setSelected(value)
		}
	}, [value, selected])

	const handleBlur = () => {
		setQuery('')
		onBlur()
	}

	return (
		<Combobox
			value={selected ?? value}
			onChange={handleChange}
			disabled={disabled}
			onClose={() => setQuery('')}
		>
			<div className="relative">
				<ComboboxInput
					className={cn(styles.input, isInvalid && styles.inputInvalid)}
					name={name}
					ref={ref}
					onBlur={handleBlur}
					placeholder="Country"
					disabled={disabled}
					onChange={(event) => setQuery(event.target.value)}
				/>
				<ComboboxButton className={cn(styles.indicator)}>
					{({ open }) => (
						<ChevronDownIcon
							className={cn('size-4 transition-all', open && 'rotate-180')}
						/>
					)}
				</ComboboxButton>
			</div>

			<ComboboxOptions
				anchor="bottom"
				portal={false}
				transition
				className={cn(
					styles.options,
					'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
				)}
			>
				{countries
					.filter((c) => c.toLowerCase().startsWith(query.trim().toLowerCase()))
					.map((country) => (
						<ComboboxOption key={country} value={country} className="group">
							<div
								className={cn(
									styles.option,
									'group-data-[selected]:bg-tw-green-light group-data-[focus]:bg-tw-neutral-100'
								)}
							>
								<img
									src={`https://flagpedia.net/data/flags/h80/${getCountryCode(country)?.toLowerCase()}.png`}
									loading="lazy"
									alt={`country-${country}`}
									width={20}
								/>
								<span>{country}</span>
							</div>
						</ComboboxOption>
					))}
			</ComboboxOptions>
		</Combobox>
	)
}
