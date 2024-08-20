'use client'
import { Logo } from '@/components/common'
import { Text, Title } from '@/components/ui'
import {
	DictionaryFeed,
	DictionaryInput,
	LearningCategory,
	selectDictionarySearchValue,
} from '@/features/dictionary'
import { useDebounce } from '@/hooks'
import { useAppSelector } from '@/store'
import { learningCategories } from './page.data'
import { useDictionarySearchQuery } from '@/api'

// TODO: see whether infinite loading is working or not
const DictionaryPage = () => {
	const searchValue = useAppSelector(selectDictionarySearchValue)
	const debouncedSearchValue = useDebounce(searchValue, 300)

	const { data, isFetching, ref } = useDictionarySearchQuery({
		q: debouncedSearchValue
	})

	const hasData = !!data?.pages[0].words.length

	return (
		<>
			<div className="md:mt-24 mt-10 flex flex-col items-center">
				<Logo
					width={130}
					height={130}
					variant="huge"
					className="md:mb-8 mb-5 "
				/>
				<Title
					variant={'h2'}
					color="primary"
					weight={700}
					size={'6xl'}
					className=" font-quicksand"
				>
					Wordly
				</Title>
				<Title
					size={'3xl'}
					variant={'h1'}
					weight={400}
					className="text-tw-gray-200 md:mt-5 mt-3 font-quicksand"
				>
					English dictionary
				</Title>
			</div>
			<div className="max-w-[47rem] mx-auto">
				<DictionaryInput />
				{!hasData && !debouncedSearchValue && (
					<Text className="mt-10 md:mt-4 text-lg leading-8 text-gray-500 text-left px-4">
						A free and online dictionary for learners of English with
						definitions, pictures and example sentences.
					</Text>
				)}
			</div>
			{!!debouncedSearchValue && !!hasData && (
				<DictionaryFeed ref={ref} data={data.pages.map((page) => page.words)} />
			)}

			{isFetching && <DictionaryFeed.Skeleton />}

			{!isFetching && !!debouncedSearchValue && !hasData && (
				<Text className="text-center mt-12" size={'2xl'} weight={700}>
					No Item Found
				</Text>
			)}

			{!debouncedSearchValue && !hasData && !isFetching && (
				<div className="sm:max-w-[640px] flex flex-col gap-16  md:max-w-3xl lg:max-w-5xl w-full mx-auto px-0 md:px-5 mt-24 ">
					{learningCategories.map((el) => (
						<LearningCategory {...el} key={el.title} />
					))}
				</div>
			)}
		</>
	)
}

export default DictionaryPage
