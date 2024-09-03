'use client'

import { UpdateProfileInput } from '@/api'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui'
import { getLanguages } from '@/lib'
import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions
} from '@headlessui/react'
import { useMemo, useState } from 'react'
import { Control } from 'react-hook-form'

import { ChevronDownIcon } from 'lucide-react'
import styles from './NativeLanguageSelect.module.scss'

interface INativeLanguageSelectProps {
	control: Control<UpdateProfileInput>
	disabled?: boolean
}

export const NativeLanguageSelect = ({
	control,
	disabled
}: INativeLanguageSelectProps) => {
	const [query, setQuery] = useState<string>('')

	const languages = useMemo(() => {
		let data = getLanguages()
		if (query) {
			data = data.filter((el) =>
				el.name.toLowerCase().includes(query.toLowerCase())
			)
		}
		return data
	}, [query])

	return (
		<FormField
			control={control}
			name="nativeLanguage"
			render={({ field }) => (
				<FormItem className={styles.wrapper}>
					<FormLabel>Native language</FormLabel>
					<Combobox
						disabled={disabled}
						value={field.value}
						onChange={(val) => field.onChange(val ?? undefined)}
					>
						<div className="relative">
							<ComboboxInput
								className={styles.input}
								displayValue={(item: string) =>
									languages.find((opt) => opt.code === item)?.name ?? ''
								}
								placeholder="Select your native language"
								disabled={disabled}
								onChange={(event) => setQuery(event.target.value)}
							/>
							<ComboboxButton className={styles.indicator}>
								<ChevronDownIcon />
							</ComboboxButton>
						</div>
						<ComboboxOptions className={styles.options} transition>
							{languages.map((option) => (
								<ComboboxOption
									key={option.code}
									value={option.code}
									className={styles.option}
								>
									{option.name}
								</ComboboxOption>
							))}
						</ComboboxOptions>
					</Combobox>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
