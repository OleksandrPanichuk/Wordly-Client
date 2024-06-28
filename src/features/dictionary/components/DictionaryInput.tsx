'use client'

import { SvgIcon } from '@/components/common'
import { cn } from '@/lib'
import { useDictionaryStore } from '@/features/dictionary'
import { X } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'

export const DictionaryInput = () => {
	const [focused, setFocused] = useState<boolean>(false)
	const { searchValue, setSearchValue } = useDictionaryStore()

	const ref = useRef<ElementRef<'input'>>(null)

	return (
		<div
			className={cn(
				'transition-all mt-8 mx-auto max-w-[42rem] max-h-[5rem] rounded-[1.5rem]',
				!focused && 'shadow-[0px_0px_30px_-10px_#6248B1]'
			)}
			onClick={() => ref.current?.focus()}
		>
			<div className=' relative flex items-center ring-4 border-tw-purple border-[0.35rem] rounded-3xl ring-[#6248B1]/10 bg-white bg-opacity-80 cursor-text'>
				<SvgIcon name='search' className='fill-gray-500 ml-3 md:ml-5' />
				<input
					ref={ref}
					placeholder='Search for a word'
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					className='flex overflow-hidden focus:outline-none placeholder:text-gray-500 placeholder:uppercase py-4 md:py-7 w-[80%] rounded-3xl pl-9 md:pl-[2.5rem] font-quicksand font-bold text-sm md:text-xl max-h-[69px]'
				/>
				{!!searchValue && (
					<button
						className=' ml-auto mr-3 md:mr-5'
						onClick={() => setSearchValue('')}
					>
						<X className='stroke-gray-500' />
					</button>
				)}
			</div>
		</div>
	)
}
