'use client'

import { useInfiniteWordsQuery } from '@/api'
import { DataTable } from '@/components/common'
import { useAuth } from '@/providers'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { columns } from './columns'
import styles from './WordsDataTable.module.scss'

export const WordsDataTable = () => {
	const { user } = useAuth()
	const searchParams = useSearchParams()
	const searchValue = searchParams.get('q') ?? undefined

	const [take, setTake] = useState<number>(10)
	const [page, setPage] = useState<number>(1)

	const { fetchNextPage, hasNextPage, data } = useInfiniteWordsQuery({
		creatorId: searchValue ? undefined : user?.id,
		searchValue,
		take
	})

	const tableData = useMemo(
		() =>
			data?.pages
				.map((el) => el.words)
				.flat()
				.map((el, index) => ({ ...el, index })) ?? [],
		[data]
	)
	const dataToShow = useMemo(
		() => tableData.slice(take * (page - 1), take * (page - 1) + take),
		[tableData, take, page]
	)
	const previousData = useMemo(
		() =>
			page - 2 < 0
				? undefined
				: tableData.slice(take * (page - 2), take * (page - 2) + take),
		[page, tableData, take]
	)

	const handleNextPage = () => {
		if (data && data.pages.length > page) {
			return
		}
		fetchNextPage()
	}

	const canFetchMore = (data && data.pages.length > page) || hasNextPage

	useEffect(() => {
		setPage(1)
	}, [take])

	return (
		<DataTable columns={columns} data={dataToShow} withPagination withSorting>
			<DataTable.Content />
			<DataTable.Pagination>
				<DataTable.PageSizeSelect
					selectProps={{
						onValueChange: (value) => setTake(parseInt(value))
					}}
				/>
				<div className={styles.paginationButtons}>
					<DataTable.Prev
						hasPreviousPage={!!previousData}
						onClick={() => setPage(page - 1)}
					/>
					<DataTable.Next
						hasNextPage={canFetchMore}
						fetchNextPage={handleNextPage}
						onClick={() => setPage(page + 1)}
					/>
				</div>
			</DataTable.Pagination>
		</DataTable>
	)
}
