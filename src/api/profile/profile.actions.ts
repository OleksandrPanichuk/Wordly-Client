'use server'

import { SESSION_COOKIE_NAME } from '@/constants'
import { TypeUser } from '@/types'
import { cookies } from 'next/headers'
import { ProfileApi } from './profile.service'

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
