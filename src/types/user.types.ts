export enum UserRole {
	USER= 'USER',
	ADMIN= 'ADMIN'
}

export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
	OTHER = 'OTHER'
}

export type TypeUser = {
	id: string
	email: string
	username: string
	avatar?: {
		url: string
		key?: string
	}

	role: UserRole
	gender?: Gender
	nativeLanguage?: string

	createdAt: Date
	updatedAt: Date
}

export type TypeEditingStats = {
	createdWords: number
	createdMeanings: number
	createdExpressions: number
	createdLists: number
	createdPacks: number
	createdSets: number
}
