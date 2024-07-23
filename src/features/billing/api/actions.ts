'use server'

import { fetcher } from '@/lib'
import type { TypeSubscription } from '@/shared/types'

export async function getSubscription() {
	try {
		return await fetcher.get<TypeSubscription>('/subscription')
	} catch (error) {
		return null
	}
}
