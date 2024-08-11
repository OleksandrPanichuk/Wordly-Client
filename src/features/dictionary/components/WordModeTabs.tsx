import { Tabs, TabsList, TabsTrigger } from '@/components/ui'
import { DictionaryModes } from '@/constants'
import { DictionaryMode } from '@/types'

interface IModeTabsProps {
	onChange: (val: DictionaryMode) => void
	defaultValue: DictionaryMode
}

export const ModeTabs = ({ onChange, defaultValue }: IModeTabsProps) => {
	return (
		<Tabs defaultValue={defaultValue} onChange={(e) => {}}>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger
					onClick={() => onChange('DICTIONARY')}
					value={DictionaryModes.DICTIONARY}
				>
					Dictionary
				</TabsTrigger>
				<TabsTrigger
					onClick={() => onChange('USER')}
					value={DictionaryModes.USER}
				>
					Users
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
