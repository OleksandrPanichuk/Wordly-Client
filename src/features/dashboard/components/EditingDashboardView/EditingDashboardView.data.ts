import { TypeEditingStats } from '@/types'
import { Variants } from 'framer-motion'

export const stats: { key: keyof TypeEditingStats; title: string }[] = [
	{
		key: 'createdPacks',
		title: 'Created packs'
	},
	{
		key: 'createdSets',
		title: 'Created sets'
	},
	{
		key: 'createdLists',
		title: 'Created lists'
	},
	{
		key: 'createdWords',
		title: 'Created words'
	},
	{
		key: 'createdExpressions',
		title: 'Created expressions'
	},
	{
		key: 'createdMeanings',
		title: 'Created meanings'
	}
]

export const getVariants = (index: number): Variants => ({
	hidden: {
		opacity: 0,
		x: '-25%'
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			delay: index * 0.5
		}
	}
})
