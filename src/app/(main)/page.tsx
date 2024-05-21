'use client'

import { Text, Title } from '@/components/ui'

// TODO: landing page
export default function Home() {
	return (
		<div>
			<Title
				variant={'h2'}
				as='h1'
				className='text-tw-gray-500 text-center mt-12 mb-4'
			>
				Learn With <span className='text-tw-blue-300'>Word</span>
				<span className='text-tw-purple'>ly</span>
			</Title>
			<Text className='text-center' color={'gray-400'} size='lg' weight={500}>
				Wordly is a language learning platform that helps you learn easier,
				faster and smarter.
			</Text>
		</div>
	)
}
