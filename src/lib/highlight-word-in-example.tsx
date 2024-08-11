import { Fragment } from 'react'

export function highlightWordInExample(
	example: string,
	wordToHighlight: string
) {
	const words = splitSentence(example)

	const data = words.map((word, index) => {
		const regex = new RegExp(`^${wordToHighlight}(s|ed)?(?![a-zA-Z])`, 'i')
		return regex.test(word)
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

function splitSentence(sentence: string): string[] {
	const wordPattern = /[\w\u0400-\u04FF]+|[.,!?]|[\s]+/g
	const words = sentence.match(wordPattern)
	return words ? words : []
}
