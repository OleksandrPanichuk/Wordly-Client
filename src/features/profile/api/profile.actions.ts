'use server'

import { SESSION_COOKIE_NAME } from '@/constants'
import { ProfileApi } from '@/features/profile'
import { TypeUser } from '@/types'
import { cookies } from 'next/headers'

export async function currentUser() {
	let user: TypeUser | null = null

	try {
		const hasSessionCookie = cookies().has(SESSION_COOKIE_NAME)

		if (hasSessionCookie) {
			user = await ProfileApi.currentUser()
		}
	} finally {
		return user
	}
}
