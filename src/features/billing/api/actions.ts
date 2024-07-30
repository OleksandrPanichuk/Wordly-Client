'use server'

import { BillingApi } from '@/features/billing'

export async function getSubscription() {
	try {
		return await BillingApi.getSubscription()
	} catch (error) {
		return
	}
}
