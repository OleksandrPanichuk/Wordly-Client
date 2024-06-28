'use client'

import { Skeleton, Text, Title } from '@/components/ui'
import { capitalize } from '@/lib'
import { Routes } from '@/shared/constants'
import { TypeSearchDictionaryWord } from '@/shared/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './Card.module.scss'

interface ICardProps {
	data: TypeSearchDictionaryWord
	index: number
}

export const Card = ({ data, index }: ICardProps) => {
	const router = useRouter()

	return (
		<div
			onClick={() => router.push(Routes.DICTIONARY + `/${data.name}`)}
			className={styles.wrapper}
		>
			{data?.image && (
				<div className={styles.image}>
					<Image src={data.image} alt={data.name} fill />
				</div>
			 )} 
			<div className='md:flex-1'>
				<Title size={'3xl'} variant={'h4'} className='text-black'>
					<Link href={Routes.DICTIONARY + `/${data.name}`}>
						{index + 1}. {capitalize(data.name)}
					</Link>
				</Title>
				<Text size='lg' className='mt-2 text-gray-500 font-quicksand leading-8'>
					{data.meaning}
				</Text>
			</div>
		</div>
	)
}

Card.Skeleton = function CardSkeleton() {
	return <div className={styles.skeleton}>
		<Skeleton className='w-[190px]  h-[151px]' /> 
		<div className='md:flex-1 flex flex-col gap-4 '>
			<Skeleton className='w-[40%] min-w-[140px] h-8'/>
			<Skeleton className='w-[70%] min-w-[200px] h-6'/>
			<Skeleton className='w-[50%] min-w-[160px] h-6'/>
		</div>
	</div>
}