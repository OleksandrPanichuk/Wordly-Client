'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'

import { PartOfSpeech } from '@/types'
import styles from './WordsPartOfSpeech.module.scss'

interface IWordsPartOfSpeechProps {
	partsOfSpeech: PartOfSpeech[]
}

export const WordsPartOfSpeech = ({partsOfSpeech}: IWordsPartOfSpeechProps) => {
	return (
		<div className={styles.partsOfSpeechWrapper}>
			{partsOfSpeech.slice(0, 2).map((el) => (
				<button key={el} className={styles.partsOfSpeechItem}>
					{el}
				</button>
			))}
			{partsOfSpeech.slice(2).length > 1 && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<button className={styles.partsOfSpeechItem}>
								+{partsOfSpeech.slice(2).length} more
							</button>
						</TooltipTrigger>
						<TooltipContent className={styles.partsOfSpeechTooltip}>
							{partsOfSpeech.slice(2).map((el) => (
								<button key={el} className={styles.partsOfSpeechItem}>
									{el}
								</button>
							))}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</div>
	)
}
