'use client'

import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui'
import { useSafeContext } from '@/hooks'
import { cn } from '@/lib'
import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table'
import once from 'lodash.once'
import { createContext, MouseEvent, useState } from 'react'
import styles from './DataTable.module.scss'
import type {
	IDataTableContext,
	IDataTableNextProps,
	IDataTablePageSizeSelectProps,
	IDataTablePaginationProps,
	IDataTablePrevProps,
	IDataTableProps
} from './DataTable.types'
import { Loader2 } from 'lucide-react'

const createDataTableContext = once(<T,>() =>
	createContext<IDataTableContext<T>>({} as IDataTableContext<T>)
)

const useDataTableContext = <T = unknown,>() =>
	useSafeContext(createDataTableContext<T>())

export const DataTable = <TValue = unknown,>({
	columns,
	data,
	isLoading,
	withFiltering,
	withPagination,
	withSorting,
	children
}: IDataTableProps<TValue>) => {
	const [sorting, setSortingState] = useState<SortingState>([])
	const [columnFilters, setColumnsFilters] = useState<ColumnFiltersState>([])

	const DataTableContext = createDataTableContext<TValue>()

	const table = useReactTable({
		columns,
		data,

		getCoreRowModel: getCoreRowModel(),
		...(withSorting && {
			getSortedRowModel: getSortedRowModel(),
			onSortingChange: setSortingState
		}),
		...(withPagination && {
			getPaginationRowModel: getPaginationRowModel()
		}),

		...(withFiltering && {
			getFilteredRowModel: getFilteredRowModel(),
			onColumnFiltersChange: setColumnsFilters
		}),
		state: { sorting, columnFilters }
	})

	return (
		<DataTableContext.Provider value={{ table, data, columns, isLoading }}>
			<div>{children}</div>
		</DataTableContext.Provider>
	)
}

DataTable.Content = function DataTableContent() {
	const { table, columns, isLoading } = useDataTableContext()
	return (
		<div className={styles.content}>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} className="text-black">
										<div className="mx-auto w-full flex justify-center">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</div>
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										<div className="text-center mx-auto">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</div>
									</TableCell>
								))}
							</TableRow>
						))
					) : isLoading ? (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 ">
								<Loader2
									className={'size-8 animate-spin text-sky-600 mx-auto'}
								/>
								<span className={'block mx-auto text-center'}>Loading...</span>
							</TableCell>
						</TableRow>
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}

// TODO:
DataTable.Input = function DataTableInput() {
	const { table, columns, data } = useDataTableContext()



	return <></>
}

DataTable.Pagination = function DataTablePagination({
	children,
	classNames,
	containerProps,
	...wrapperProps
}: IDataTablePaginationProps) {
	return (
		<div
			className={cn(styles.paginationWrapper, classNames?.wrapper)}
			{...wrapperProps}
		>
			<div
				className={cn(styles.paginationContainer, classNames?.container)}
				{...containerProps}
			>
				{children}
			</div>
		</div>
	)
}

DataTable.PageSizeSelect = function DataTablePageSizeSelect({
	classNames,
	selectProps,
	optionProps,
	optionsProps,
	valueProps,
	textProps,
	triggerProps,
	...wrapperProps
}: IDataTablePageSizeSelectProps) {
	const { table } = useDataTableContext()

	const handleValueChange = (value: string) => {
		table.setPageSize(Number(value))
		selectProps?.onValueChange?.(value)
	}
	return (
		<div
			className={cn(styles.pageSizeWrapper, classNames?.wrapper)}
			{...wrapperProps}
		>
			<p className={cn(styles.pageSizeText, classNames?.text)} {...textProps}>
				Rows per page
			</p>
			<Select
				{...selectProps}
				value={selectProps?.value ?? `${table.getState().pagination.pageSize}`}
				onValueChange={handleValueChange}
			>
				<SelectTrigger
					className={cn(styles.pageSizeTrigger, classNames?.trigger)}
					{...triggerProps}
				>
					<SelectValue
						placeholder={table.getState().pagination.pageSize}
						{...valueProps}
					/>
				</SelectTrigger>
				<SelectContent
					side="top"
					{...optionsProps}
					className={classNames?.options}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<SelectItem
							className={classNames?.option}
							key={pageSize}
							value={`${pageSize}`}
							{...optionProps}
						>
							{pageSize}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

DataTable.Next = function DataTableNext({
	fetchNextPage,
	hasNextPage,
	disabled,
	onClick,
	...props
}: IDataTableNextProps) {
	const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
		onClick?.(event)
		fetchNextPage?.()
	}

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleNext}
			disabled={!hasNextPage || disabled}
			{...props}
		>
			Next
		</Button>
	)
}

DataTable.Prev = function DataTablePrev({
	fetchPreviousPage,
	hasPreviousPage,
	disabled,
	onClick,
	...props
}: IDataTablePrevProps) {
	const handlePrev = (event: MouseEvent<HTMLButtonElement>) => {
		onClick?.(event)
		fetchPreviousPage?.()
	}
	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handlePrev}
			disabled={!hasPreviousPage || disabled}
			{...props}
		>
			Previous
		</Button>
	)
}
