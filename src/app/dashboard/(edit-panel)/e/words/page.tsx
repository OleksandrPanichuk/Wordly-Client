// TODO:
// [] - Infinite words loading(pagination based) with initial data fetched on the server
// [] - If there is search value, show user all the words, if there is not searchValue, show all the words which user has created
// [] - Near search input field show add button which should open modal
// [] - Table or cards layout

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
				<SearchInput placeholder={'Search words'} />
				<CreateWordButton />
				<LayoutTypeSelect />
			</div>
			<WordsView />
		</div>
	)
}

export default EditWordsPage
