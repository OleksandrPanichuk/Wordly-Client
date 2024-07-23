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
