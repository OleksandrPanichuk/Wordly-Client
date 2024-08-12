'use server'

import { BillingApi } from '@/features/billing'
import { TypePayment } from '@/types'

export async function getSubscription() {
	try {
		return await BillingApi.getSubscription()
	} catch (error) {
		return
	}
}


export async function getPayments(): Promise<TypePayment[]> {
	try {
		return await BillingApi.getPayments()
	} catch (err) {
		console.log("ERROR", err)
		return []
	}
}