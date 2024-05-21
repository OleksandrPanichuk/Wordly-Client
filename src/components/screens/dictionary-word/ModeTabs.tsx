import { cn } from '@/lib'
import { DictionaryMode } from '@/shared/types'
import { ElementRef, MouseEvent, useEffect, useRef } from 'react'

interface IModeTabsProps {
	onChange: (val: DictionaryMode) => void
	value: DictionaryMode
}

export const ModeTabs = ({ onChange, value }: IModeTabsProps) => {
	const sliderRef = useRef<ElementRef<'div'>>(null)
	const wrapperRef = useRef<ElementRef<'div'>>(null)

	const setDefaultSliderPosition = () => {
		if (!sliderRef.current) return

		const dictionaryTab =
			wrapperRef.current?.querySelector<HTMLButtonElement>('#tab-dictionary')
		if (!dictionaryTab) return
		sliderRef.current.style.left = '0px'
		sliderRef.current.style.width =
			dictionaryTab.getBoundingClientRect().width + 'px'
	}

	const changeSliderPosition = (
		e: MouseEvent<HTMLButtonElement>,
		mode: 'over' | 'out'
	) => {
		if (!sliderRef.current) return

		if (
			mode === 'out'
				? value === 'DICTIONARY'
				: e.currentTarget.id === 'tab-dictionary'
		) {
			setDefaultSliderPosition()
		} else {
			const userBtn =
				wrapperRef.current?.querySelector<HTMLButtonElement>('#tab-user')
			const dictionaryTab =
				wrapperRef.current?.querySelector<HTMLButtonElement>('#tab-dictionary')
			if (!userBtn || !dictionaryTab) return

			sliderRef.current.style.left =
				dictionaryTab.getBoundingClientRect().width + 'px'
			sliderRef.current.style.width =
				userBtn.getBoundingClientRect().width + 'px'
		}
	}

	useEffect(setDefaultSliderPosition, [])

	return (
		<div ref={wrapperRef} className={'border border-input rounded-md relative'}>
			<div
				ref={sliderRef}
				className='bg-accent absolute h-full w-0 -z-10 transition-all duration-300'
			/>
			<button
				onClick={() => onChange('DICTIONARY')}
				onMouseOut={e => changeSliderPosition(e, 'out')}
				onMouseOver={e => changeSliderPosition(e, 'over')}
				className={
					'  rounded-tl-md rounded-bl-md border-input border-r px-4 py-2 transition-all'
				}
				id='tab-dictionary'
			>
				Dictionary
			</button>
			<button
				onClick={() => onChange('USER')}
				onMouseOut={e => changeSliderPosition(e, 'out')}
				onMouseOver={e => changeSliderPosition(e, 'over')}
				className={
					'   rounded-tr-md rounded-br-md  px-4 py-2 transition-all'
				}
				id='tab-user'
			>
				Users
			</button>
		</div>
	)
}
