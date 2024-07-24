'use client'

import { Text, Title } from '@/components/ui'
import { selectAuthUser } from '@/features/auth'
import { useAppSelector } from '@/store'

// TODO: landing page
export default function Home() {
	const user = useAppSelector(selectAuthUser)
	return (
		<div>
			<Title
				variant={'h2'}
				as="h1"
				className="text-tw-gray-500 text-center mt-12 mb-4"
			>
				Learn With <span className="text-tw-blue-300">Word</span>
				<span className="text-tw-purple-400">ly</span>
			</Title>
			<Text className="text-center" color={'gray-400'} size="lg" weight={500}>
				Wordly is a language learning platform that helps you learn easier,
				faster and smarter.
			</Text>
			<p>USER: {user?.email}</p>
		</div>
	)
}
