import { ApiRoutes } from '@/constants'
import { fetcher } from '@/lib'
import { TypeEditingStats } from '@/types'

const getEditingStats = async () => {
	return await fetcher.getOrNull<TypeEditingStats>(ApiRoutes.STATISTICS.EDITING)
}

export const DashboardApi = {
	getEditingStats
} as const
