'use server'

import { fetcher } from '@/lib'
import { SESSION_NAME } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import { cookies } from 'next/headers'

export async function currentUser() {
	let user: TypeUser | null = null

	try {
		const hasSessionCookie = cookies().has(SESSION_NAME)

		// if (hasSessionCookie) {
			user = await fetcher.get<TypeUser>('/users/current')
		// }
	} catch (err) {
		console.log(err)
	} finally {
		return user
	}
	
}
