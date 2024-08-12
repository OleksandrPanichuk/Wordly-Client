export type TypeBillingInfo = {
	id: string
	firstName: string
	lastName: string
	email: string
	country: string
	city: string
	address: string
	phoneNumber: string
	postalCode: string
	userId: string
}

export type TypeSubscription = {
	id: string
	lsSubscriptionId: string
	productId: number
	endsAt?: Date
	createdAt: Date
	userId: string
	isUnlimite: boolean
}

export enum BillingReason {
	INITIAL = 'initial',
	RENEWAL = 'renewal',
	UPDATED = 'updated'
}

export type TypePayment = {
	id: string
	billingReason: BillingReason
	userId: string
	lsSubscriptionId: string
	subscriptionId?: string

	subtotal: number
	tax: number
	total: number

	createdAt: Date
}
