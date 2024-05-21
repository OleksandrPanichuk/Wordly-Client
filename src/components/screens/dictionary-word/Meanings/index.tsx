import { cn } from '@/lib'
import { PartOfSpeech, TypeDictionaryWord } from '@/shared/types'
import { variants } from './Meanings.data'

interface IMeaningsProps {
	definitions: TypeDictionaryWord['meanings'][0]['definitions']
	partOfSpeech: PartOfSpeech
}

export const Meanings = ({ definitions, partOfSpeech }: IMeaningsProps) => {


	return <div>{}</div>
}
