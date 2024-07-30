export type UserRole = 'USER' | 'ADMIN'

export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
	OTHER = 'OTHER'
}


export type TypeUser = {
	id: string
	email: string
	username:string
	avatar?: {
		url: string
		key?: string
	}

	role: UserRole
	gender?: Gender
	nativeLanguages?: string[]
	

	createdAt: Date
	updatedAt: Date
}
