'use client'

import { Input } from '@/components/ui'
import { useDebounce } from '@/hooks'
import { cn } from '@/lib'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
	ChangeEvent,
	ComponentPropsWithoutRef,
	useEffect,
	useState
} from 'react'

export const SearchInput = ({
	className,
	...props
}: Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'>) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [value, setValue] = useState(searchParams.get('q') || '')

	const debouncedValue = useDebounce(value, 300)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setValue(value)
	}

	useEffect(() => {
		const query = new URLSearchParams(searchParams.toString())
		if (!debouncedValue && searchParams.get('q')) {
			query.set('q', '')
			const url = `${pathname}?${query.toString()}`
			return router.push(url)
		}

		if (!debouncedValue) {
			return 
		}

		if (debouncedValue === searchParams.get('q')) {
			return
		}
		
		query.set('q', debouncedValue)

		const url = `${pathname}?${query.toString()}`
		window.history.replaceState({}, '', url)
	}, [router, pathname, searchParams, debouncedValue])

	return (
		<Input
			value={value}
			onChange={handleChange}
			className={cn('w-full h-9', className)}
			{...props}
		/>
	)
}
