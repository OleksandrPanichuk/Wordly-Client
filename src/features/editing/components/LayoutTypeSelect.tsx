'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
	iconButtonVariants
} from '@/components/ui'
import { LayoutGridIcon, LucideIcon, TableIcon } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { LayoutTypes } from '../types'

const options: {
	icon: LucideIcon
	text: string
	value: LayoutTypes
}[] = [
	{
		icon: TableIcon,
		text: 'Table',
		value: LayoutTypes.TABLE
	},
	{
		icon: LayoutGridIcon,
		text: 'Cards',
		value: LayoutTypes.FEED
	}
]

export const LayoutTypeSelect = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const [value, setValue] = useState(
		(() => {
			const initialValue = searchParams.get('layout')

			if (!initialValue) {
				return LayoutTypes.TABLE
			}

			const validatedValue = z.nativeEnum(LayoutTypes).safeParse(initialValue)

			if (!validatedValue.success) {
				return LayoutTypes.TABLE
			}

			return validatedValue.data
		})()
	)

	const Icon = options.find((o) => o.value === value)!.icon

	const handleValueChange = (value: string) => {
		setValue(value as LayoutTypes)

		const query = new URLSearchParams(searchParams.toString())
		query.set('layout', value)

		const url = `${pathname}?${query.toString()}`
		window.history.replaceState({}, '', url)
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={iconButtonVariants({
						variant: 'ghost',
						size: 'sm'
					})}
				>
					<Icon />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[200px] mr-2">
				<DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
					{options.map(({ icon, text, value }) => {
						const Icon = icon
						return (
							<DropdownMenuRadioItem
								key={value}
								value={value}
								className="flex gap-1"
							>
								<Icon />
								{text}
							</DropdownMenuRadioItem>
						)
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
