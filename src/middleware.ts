import { Routes } from '@/constants'
import { currentUser } from '@/features/profile'
import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
	const user = await currentUser()

	if (!user) {
		return NextResponse.redirect(new URL(Routes.SIGN_IN, req.url))
	}

	return NextResponse.next()
}
export const config: MiddlewareConfig = {
	matcher: ['/payment', '/dashboard/:path*']
}
