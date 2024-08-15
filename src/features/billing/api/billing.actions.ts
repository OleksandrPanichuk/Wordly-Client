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
	
		return []
	}
}
export async function getPayment(paymentId: string): Promise<TypePayment | null> {
	try {
		return await BillingApi.getPayment(paymentId)
	} catch (err) {
		return null
	}
}