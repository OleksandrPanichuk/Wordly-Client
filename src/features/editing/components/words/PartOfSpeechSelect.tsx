'use client'
import {
	FormControl,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui'
import { capitalize, cn } from '@/lib'
import { PartOfSpeech } from '@/types'
import { forwardRef } from 'react'

const options: PartOfSpeech[] = [
	PartOfSpeech.ADJECTIVE,
	PartOfSpeech.ADVERB,
	PartOfSpeech.NOUN,
	PartOfSpeech.VERB,
	PartOfSpeech.PREPOSITION,
	PartOfSpeech.PRONOUN,
	PartOfSpeech.CONJUNCTION,
	PartOfSpeech.INTERJECTION
]

type IPartOfSpeechSelectProps = {
	value: PartOfSpeech
	onChange: (value: string) => void
	disabled?: boolean
}

export const PartOfSpeechSelect = forwardRef<
	HTMLButtonElement,
	IPartOfSpeechSelectProps
>(({ value, onChange, disabled }, ref) => {
	return (
		<Select value={value} onValueChange={onChange} disabled={disabled}>
			<FormControl>
				<SelectTrigger
					className={cn(!value && 'text-muted-foreground')}
					ref={ref}
					disabled={disabled}
				>
					<SelectValue placeholder={'Select part of speech'} />
				</SelectTrigger>
			</FormControl>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option} value={option}>
						{capitalize(option)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
})

PartOfSpeechSelect.displayName = 'PartOfSpeechSelect'
