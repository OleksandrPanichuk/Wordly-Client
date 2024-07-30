import { UpdateProfileInput, updateProfileSchema } from '@/features/profile'
import { axios, fetcher } from '@/lib'
import { TypeUser } from '@/shared/types'
import { isServer } from '@tanstack/react-query'

export class ProfileApi {
	public static async currentUser(): Promise<TypeUser> {
		if (isServer) {
			return (await fetcher.get<TypeUser>('/users/current')).data
		}
		return (await axios.get<TypeUser>('/users/current')).data
	}

	public static async update(dto: UpdateProfileInput) {
		updateProfileSchema.parse(dto)
		return await axios.patch<TypeUser>('/users/current', dto)
	}


	public static async delete() {
		return await axios.delete('/users/current')
	}
}
