import { Button, Text, Title } from '@/components/ui'
import { cn } from '@/lib'
import { TypeLearningCategory } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export const LearningCategory = ({
	description,
	href,
	imageUrl,
	title,
	rtl
}: TypeLearningCategory) => {
	return (
		<div
			className={cn(
				'flex flex-col md:items-start',
				rtl ? 'md:flex-row-reverse' : 'md:flex-row'
			)}
		>
			<div className="relative md:flex-1 w-full aspect-2/1">
				<Image
					alt={`image-for-${title}`}
					src={imageUrl}
					fill
					objectFit="contain"
				/>
			</div>
			<div className="md:flex-1">
				<Title
					variant={'h4'}
					weight={500}
					size={'3xl'}
					className="font-quicksand text-gray-500"
				>
					{title}
				</Title>
				<Text size={'lg'} className="mt-5 leading-9 text-gray-500">
					{description}
				</Text>
				<Button
					weight={700}
					variant={'secondary'}
					font={'md'}
					className="font-quicksand mt-4 md:mx-0 mx-auto block w-min"
					asChild
				>
					<Link href={href}>Start Learning</Link>
				</Button>
			</div>
		</div>
	)
}
