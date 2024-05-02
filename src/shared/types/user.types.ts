export type TypeUser = {
	id: string
	email: string
	username:string
	avatar?: {
		url: string
		key?: string
	}

	createdAt: Date
	updatedAt: Date
}
