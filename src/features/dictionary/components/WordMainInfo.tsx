import { SvgIcon } from '@/components/common'
import { Skeleton, Title } from '@/components/ui'
import { Images } from '@/constants'
import type { TypeDictionaryWord } from '@/features/dictionary'
import Image from 'next/image'

interface IWordMainInfoProps {
	name?: TypeDictionaryWord['name']
	phonetics?: TypeDictionaryWord['phonetics']
	partsOfSpeech?: TypeDictionaryWord['partsOfSpeech']
}

export const WordMainInfo = ({
	name,
	partsOfSpeech,
	phonetics
}: IWordMainInfoProps) => {
	const playPronunciation = () =>
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(name))

	return (
		<div>
			<div className="rounded-t-3xl bg-tw-blue-50 p-6 flex justify-between gap-4 md:gap-5 flex-col">
				<Title variant={'h1'} size={'5xl'} weight={700}>
					<span>{name}</span>
					<button className="ml-2" onClick={playPronunciation}>
						<SvgIcon name="volume" width={25} />
					</button>
				</Title>
				<div className="flex flex-col gap-3">
					{phonetics?.general && (
						<div className="text-gray-500 text-xl font-medium font-quicksand flex gap-4">
							{phonetics.general}
						</div>
					)}
					{phonetics?.en && (
						<div className="text-gray-500 text-xl font-medium font-quicksand flex gap-4">
							<Image
								width={30}
								height={30}
								src={Images.EN_FLAG}
								alt="en-pronunciation"
								className="rounded-full"
							/>
							{phonetics.en}
						</div>
					)}
					{phonetics?.us && (
						<div className="text-gray-500 text-xl font-medium font-quicksand flex gap-4">
							<Image
								width={30}
								height={30}
								src={Images.US_FLAG}
								alt="us-pronunciation"
								className="rounded-full"
							/>
							{phonetics.us}
						</div>
					)}
				</div>
			</div>
			<div className="bg-[#F0F4FA] rounded-b-3xl md:py-3 md:px-6 py-2 px-4 font-medium">
				<div className="flex  flex-wrap items-center">
					{partsOfSpeech?.map((partOfSpeech, index) =>
						index === 0 ? (
							<a key={partOfSpeech} href={`#${partOfSpeech.toLowerCase()}`}>
								<button className="bg-tw-blue-450 !leading-none text-white py-3 px-6 rounded-3xl md:text-base text-sm ">
									{partOfSpeech}
								</button>
							</a>
						) : (
							<a key={partOfSpeech} href={`#${partOfSpeech.toLowerCase()}`}>
								<button className="bg-transparent !leading-none text-tw-gray-400 py-3 px-6 rounded-3xl md:text-base text-sm ">
									{partOfSpeech}
								</button>
							</a>
						)
					)}
				</div>
			</div>
		</div>
	)
}

WordMainInfo.Skeleton = function MainInfoSkeleton() {
	return (
		<div>
			<div className="rounded-t-3xl bg-tw-blue-50 p-6 flex justify-between gap-4 md:gap-5 flex-col">
				<Skeleton className="h-10 w-[50%]" />
				<div className="flex flex-col gap-3">
					<div className="text-gray-500 text-xl font-medium font-quicksand flex gap-4">
						<Image
							width={30}
							height={30}
							src={Images.EN_FLAG}
							alt="en-pronunciation"
							className="rounded-full"
						/>
						<Skeleton className="h-6 w-[15%]" />
					</div>

					<div className="text-gray-500 text-xl font-medium font-quicksand flex gap-4">
						<Image
							width={30}
							height={30}
							src={Images.US_FLAG}
							alt="us-pronunciation"
							className="rounded-full"
						/>
						<Skeleton className="h-6 w-[15%]" />
					</div>
				</div>
			</div>
			<div className="bg-[#F0F4FA] rounded-b-3xl md:py-3 md:px-6 py-2 px-4 font-medium h-[4.5rem]"></div>
		</div>
	)
}
