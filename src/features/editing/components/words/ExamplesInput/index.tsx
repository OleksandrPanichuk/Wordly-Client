'use client'

import { CreateWordInput } from '@/api'
import { Button, FormControl, Input } from '@/components/ui'
import { capitalize, highlightWordInExample, testSentenceOnWord } from '@/lib'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

import styles from './ExamplesInput.module.scss'

interface IExamplesInputProps
	extends Omit<
		ControllerRenderProps<CreateWordInput, 'meaning.examples'>,
		'ref' | 'name'
	> {
	name: string
}

export const ExamplesInput = forwardRef<HTMLInputElement, IExamplesInputProps>(
	({ name, onChange, value }, ref) => {
		const [inputValue, setInputValue] = useState('')

		const handleAdd = () => {
			onChange([...(value ?? []), inputValue])
			setInputValue('')
		}
		const handleRemove = (example: string) => {
			onChange(value?.filter((el) => el !== example))
		}

		return (
			<div className={styles.wrapper}>
				<div className={styles.input}>
					<FormControl>
						<Input
							ref={ref}
							placeholder="Add an example here..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</FormControl>
					<Button
						size={'icon'}
						variant="primary-outline"
						onClick={handleAdd}
						disabled={!inputValue || !testSentenceOnWord(inputValue, name)}
						type="button"
					>
						<PlusIcon />
					</Button>
				</div>
				<ul>
					{value?.map((example, index) => (
						<li key={index} className={styles.example}>
							<p>{highlightWordInExample(capitalize(example), name)}</p>
							<button
								type={'button'}
								onClick={() => handleRemove(example)}
								className={styles.remove}
							>
								<TrashIcon size={20} />
							</button>
						</li>
					))}
				</ul>
			</div>
		)
	}
)

ExamplesInput.displayName = 'Index'
