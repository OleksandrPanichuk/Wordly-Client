import type {
	SelectContentProps,
	SelectItemProps,
	SelectProps,
	SelectTriggerProps,
	SelectValueProps
} from '@radix-ui/react-select'
import type { ColumnDef, Table } from '@tanstack/react-table'
import type {
	ComponentPropsWithoutRef,
	ElementType,
	PropsWithChildren
} from 'react'


type ComponentProps<T extends ElementType> = Omit<
	ComponentPropsWithoutRef<T>,
	'className'
>

export interface IDataTableProps<TValue> extends PropsWithChildren {
	columns: ColumnDef<TValue >[]
	data: TValue[] 
	isLoading?: boolean
	withPagination?: boolean
	withSorting?: boolean
	withFiltering?: boolean
}

export interface IDataTableContext<TValue> {
	table: Table<TValue>
	data: TValue[]
	columns: ColumnDef<TValue>[]
}

export interface IDataTablePaginationProps
	extends ComponentProps<'div'>,
		PropsWithChildren {
	classNames?: {
		wrapper?: string
		container?: string
	}
	containerProps?: ComponentProps<'div'>
}

export interface IDataTablePageSizeSelectProps extends ComponentProps<'div'> {
	classNames?: {
		wrapper?: string
		text?: string
		select?: string
		trigger?: string
		options?: string
		option?: string
	}
	textProps?: ComponentProps<'p'>
	selectProps?: SelectProps
	triggerProps?: Omit<SelectTriggerProps, 'className'>
	valueProps?: Omit<SelectValueProps, 'className'>
	optionsProps?: Omit<SelectContentProps, 'className'>
	optionProps?: Omit<SelectItemProps, 'className' | 'value'>
}

export interface IDataTableNextProps extends ComponentPropsWithoutRef<'button'> {
	fetchNextPage?: () => void
	hasNextPage?: boolean
}

export interface IDataTablePrevProps extends ComponentPropsWithoutRef<'button'> {
	fetchPreviousPage?: () => void
	hasPreviousPage?: boolean
}
