import { ApiRoutes } from '@/constants/api-routes'
import { fetcher } from '@/lib'
import type { TypeEditingStats } from '@/features/dashboard'

const getEditingStats = async () => {
	return await fetcher.getOrNull<TypeEditingStats>(ApiRoutes.STATISTICS.EDITING)
}

export const DashboardApi = {
	getEditingStats
} as const
