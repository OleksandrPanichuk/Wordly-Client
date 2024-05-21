import { SvgIcon } from '@/components/common'
import { Skeleton, Title } from '@/components/ui'
import { Images } from '@/shared/constants'
import { TypeDictionaryWord } from '@/shared/types'
import Image from 'next/image'

interface IMainInfoProps {
	name?: TypeDictionaryWord['name']
	phonetics?: TypeDictionaryWord['phonetics']
	partsOfSpeech?: TypeDictionaryWord['partsOfSpeech']
}

export const MainInfo = ({
	name,
	partsOfSpeech,
	phonetics,
}: IMainInfoProps) => {
	const playPronunciation = () =>
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(name))

	return (
		<div className='w-full border-[0.2rem] md:border-2 md:border-l-[1rem] border-l-[0.5rem] rounded-md border-blue-800 md:p-5 p-8 flex justify-between gap-2'>
			<div className='flex-1 lg:flex-[2] flex flex-col gap-4'>
				<Title variant={'h1'} size={'5xl'} weight={700}>
					<span>{name}</span>
					<button className='ml-2' onClick={playPronunciation}>
						<SvgIcon name='volume' width={25} />
					</button>
				</Title>
				{phonetics?.general && (
					<div className='text-gray-500 text-xl font-medium font-quicksand flex gap-4'>
						{' '}
						{phonetics.general}
					</div>
				)}
				{phonetics?.en && (
					<div className='text-gray-500 text-xl font-medium font-quicksand flex gap-4'>
						<Image
							width={30}
							height={30}
							src={Images.EN_FLAG}
							alt='en-pronunciation'
							className='rounded-full'
						/>
						{phonetics.en}
					</div>
				)}
				{phonetics?.us && (
					<div className='text-gray-500 text-xl font-medium font-quicksand flex gap-4'>
						<Image
							width={30}
							height={30}
							src={Images.US_FLAG}
							alt='us-pronunciation'
							className='rounded-full'
						/>
						{phonetics.us}
					</div>
				)}
			</div>
			<div className='flex flex-wrap gap-x-2 gap-y-0.5 justify-end flex-1 items-start'>
				{partsOfSpeech?.map(el => (
					<a
						key={el}
						href={`#${el}`}
						className='text-gray-500 hover:text-gray-700 transition-colors font-quicksand  text-lg md:text-xl'
					>
						[{el.toUpperCase()}]
					</a>
				))}
			</div>
		</div>
	)
}

MainInfo.Skeleton = function MainInfoSkeleton() {
	return (
		<div className='w-full border-[0.2rem] md:border-2 md:border-l-[1rem] border-l-[0.5rem] rounded-md border-blue-800 md:p-5 p-8 flex justify-between gap-2'>
			<div className='flex flex-col gap-4 w-full flex-[2]'>
				<Skeleton className='w-[45%] h-10' />
				<div className='flex gap-4 items-center'>
					<Image
						width={30}
						height={30}
						src={Images.EN_FLAG}
						alt='en-pronunciation'
						className='rounded-full'
					/>
					<Skeleton className='w-[25%] h-6' />
				</div>
				<div className='flex gap-4 items-center'>
					<Image
						width={30}
						height={30}
						src={Images.US_FLAG}
						alt='us-pronunciation'
						className='rounded-full'
					/>
					<Skeleton className='w-[25%] h-6' />
				</div>
			</div>
			<div className='flex flex-wrap gap-x-2 gap-y-0.5 justify-end flex-1 items-start'>
				<div className='flex items-center gap-1 text-gray-500 text-lg md:text-xl'>
					[<Skeleton className='w-[80px] h-5' />]
				</div>
				<div className='flex items-center gap-1 text-gray-500 text-lg md:text-xl'>
					[<Skeleton className='w-[80px] h-5' />]
				</div>
			</div>
		</div>
	)
}
