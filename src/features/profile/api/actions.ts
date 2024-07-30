'use server'

import { SESSION_COOKIE_NAME } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import { cookies } from 'next/headers'
import { ProfileApi } from '@/features/profile'

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
