import { UpdateProfileInput, updateProfileSchema } from '@/features/profile'
import { axios, fetcher } from '@/lib'
import { ApiRoutes } from '@/shared/constants/api'
import { TypeUploadedFile, TypeUser } from '@/shared/types'
import { isServer } from '@tanstack/react-query'

export class ProfileApi {
	public static async currentUser(): Promise<TypeUser> {
		if (isServer) {
			return (await fetcher.get<TypeUser>(ApiRoutes.USERS.CURRENT)).data
		}
		return (await axios.get<TypeUser>(ApiRoutes.USERS.CURRENT)).data
	}

	public static async update(dto: UpdateProfileInput) {
		updateProfileSchema.parse(dto)

		let avatar: TypeUploadedFile | undefined = undefined

		if (dto.avatar) {
			const formData = new FormData()
			formData.append('file', dto.avatar)

			const { data } = await axios.post<TypeUploadedFile>(ApiRoutes.STORAGE.UPLOAD, formData)
			avatar = data
		}

		return await axios.patch<TypeUser>(ApiRoutes.USERS.CURRENT, {
			...dto,
			avatar
		})
	}

	public static async delete() {
		return await axios.delete(ApiRoutes.USERS.CURRENT)
	}
}
