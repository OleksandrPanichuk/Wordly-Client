type TypeData = {
	id: number
	cellName: string
	freePlan: boolean

	hint?: {
		title: string
		text: string
	}
}

export const data: TypeData[] = [
	{
		id: 1,
		cellName: '*Grammar Section',
		freePlan: true,
		hint: {
			title: 'Grammar Section',
			text: "Wordly's Basic membership provides essential tools for language learning, while the Premium membership offers a wide range of advanced features for a unique and personalized learning experience."
		}
	},
	{
		id: 2,
		cellName: '*Pronunciation Lessons',
		freePlan: true,
		hint: {
			title: 'Pronunciation Lessons',
			text: 'This is a section where you can learn the English alphabet, multigraphs, vowels, consonants, and phonological concepts through categorized lessons. You can also practice your pronunciation skills with examples taken from written and spoken sources.'
		}
	},
	{
		id: 3,
		cellName: 'Dictionary',
		freePlan: true
	},
	{
		id: 4,
		cellName: 'Expressions',
		freePlan: true
	},
	{
		id:5,
		cellName:"Vocabulary",
		freePlan:true
	},
	{
		id: 6,
		cellName: 'Personalized Lists',
		freePlan: false,
		hint: {
			title: 'Personalized lists',
			text: 'On free plan you have only one List. To create more and share them with everyone else you need to buy premium plan'
		}
	},
	{
		id: 7,
		cellName: 'Custom words and meanings',
		freePlan: false,
		hint: {
			title: 'Custom words and meanings',
			text: "With premium plan you can add new words to our dictionary(if you don't see it in our dictionary) or add new meanings to words that already exist"
		}
	},
	{
		id: 8,
		cellName: 'Custom expressions',
		freePlan: false,
	},
	{
		id: 9,
		cellName: '*Advanced vocabulary features',
		freePlan: false
	}
]
