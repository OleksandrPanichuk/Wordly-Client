'use client'

import { useInfiniteWordsQuery } from '@/api'
import { DataTable } from '@/components/common'
import { useAuth } from '@/providers'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { columns } from './columns'
import styles from './WordsDataTable.module.scss'

export const WordsDataTable = () => {
	const { user } = useAuth()
	const searchParams = useSearchParams()
	const searchValue = searchParams.get('q') ?? undefined

	const [take, setTake] = useState<number>(10)

	const {
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
		hasPreviousPage,
		data
	} = useInfiniteWordsQuery({
		creatorId: searchValue ? undefined : user?.id,
		searchValue,
		take
	})

	const tableData = data?.pages.map((el) => el.words).flat() ?? []

	return (
		<DataTable columns={columns} data={tableData} withPagination withSorting>
			<DataTable.Content />
			<DataTable.Pagination>
				<DataTable.PageSizeSelect
					selectProps={{
						onValueChange: (value) => setTake(parseInt(value))
					}}
				/>
				<div className={styles.paginationButtons}>
					<DataTable.Prev
						hasPreviousPage={hasPreviousPage}
						fetchPreviousPage={fetchPreviousPage}
					/>
					<DataTable.Next
						hasNextPage={hasNextPage}
						fetchNextPage={fetchNextPage}
					/>
				</div>
			</DataTable.Pagination>
		</DataTable>
	)
}
