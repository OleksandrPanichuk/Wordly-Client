import { ApiRoutes } from '@/constants'
import { axios, fetcher } from '@/lib'
import { TypeUploadedFile, TypeUser } from '@/types'
import { UpdateProfileInput, updateProfileSchema } from './profile.dto'

const currentUser = async (): Promise<TypeUser | null> => {
	return await fetcher.get<TypeUser>(ApiRoutes.USERS.CURRENT)
}

const update = async (dto: UpdateProfileInput) => {
	updateProfileSchema.parse(dto)

	let avatar: TypeUploadedFile | undefined = undefined

	if (dto.avatar) {
		const formData = new FormData()
		formData.append('file', dto.avatar)

		const { data } = await axios.post<TypeUploadedFile>(
			ApiRoutes.STORAGE.UPLOAD,
			formData
		)
		avatar = data
	}

	try {
		return await axios.patch<TypeUser>(ApiRoutes.USERS.CURRENT, {
			...dto,
			avatar
		})
	} catch (err) {
		if (avatar?.key) {
			await axios.delete(ApiRoutes.STORAGE.DELETE(avatar?.key))
		}
		throw err
	}
}

const deleteUser = async () => {
	return await axios.delete(ApiRoutes.USERS.CURRENT)
}

export const ProfileApi = {
	currentUser,
	update,
	delete: deleteUser
} as const
