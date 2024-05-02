import { Dialog, DialogContent, DialogTrigger, Label } from '@/components/ui'
import { SearchIcon } from 'lucide-react'

//TODO: search functionality
export const Search = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<SearchIcon />
			</DialogTrigger>
			<DialogContent className='translate-y-0 top-[10%] max-h-[80vh] overflow-auto'>
				<div className='relative'>
					<Label className='w-full px-3 flex items-center gap-2 sticky top-0'>
						<SearchIcon />
						<input
							placeholder='search'
							className='w-full focus-visible:outline-none'
						/>
					</Label>
				</div>
			</DialogContent>
		</Dialog>
	)
}
