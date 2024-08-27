import { Fragment } from 'react'
import { compareWords, splitSentence } from '@/lib'

export function highlightWordInExample(
	example: string,
	wordToHighlight: string
) {
	const words = splitSentence(example)
	const data = words.map((word, index) => {
		return compareWords(word, wordToHighlight)
			? { value: word, highlighted: true, id: index }
			: { value: word, id: index }
	})

	return (
		<>
			{data.map((el) => {
				if (el.highlighted) {
					return <span key={el.id}>{el.value}</span>
				}

				return <Fragment key={el.id}>{el.value}</Fragment>
			})}
		</>
	)
}
