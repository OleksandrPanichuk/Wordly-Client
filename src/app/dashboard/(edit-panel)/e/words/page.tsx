import { SearchInput } from '@/components/common'
import {
	CreateWordButton,
	LayoutTypeSelect,
	WordsView
} from '@/features/editing'

const EditWordsPage = () => {
	return (
		<div className="flex flex-col p-4 gap-4">
			<div className="flex gap-1 items-center justify-between">
				<SearchInput placeholder={'Search words'} className={'max-w-[300px]'} />
				<div className={'flex gap-1'}>
					<CreateWordButton />
					<LayoutTypeSelect />
				</div>
			</div>
			<WordsView />
		</div>
	)
}

export default EditWordsPage
