'use server'

import { SESSION_NAME } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import { cookies } from 'next/headers'

export async function currentUser() {
	let user: TypeUser | null = null

	try {
		const hasSessionCookie = cookies().has(SESSION_NAME)

		if (hasSessionCookie) {
			const response = await fetch(
				process.env.NEXT_PUBLIC_APP_URL + '/api/users/current',
				{
					headers: {
						Cookie: cookies().toString()
					},
					method: 'GET'
				}
			)
			const data = await response.json()
			user = data
		}
	} catch (err) {
		console.log(err)
	} finally {
		return user
	}
}
