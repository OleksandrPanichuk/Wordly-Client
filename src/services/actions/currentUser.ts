'use server'

import { axios } from '@/lib'
import { SESSION_NAME } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import { cookies } from 'next/headers'

export async function currentUser() {
	let user: TypeUser | null = null

	try {
		const hasSessionCookie = cookies().has(SESSION_NAME)

		if (hasSessionCookie) {
			const response = await axios<TypeUser>('/users/current', {
				headers: {
					Cookie: cookies().toString(),
				},
				z,
			})
			user = response.data
		}
	} finally {
		return user
	}
}
