import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import { currentUser } from './features/profile'
import { Routes } from './shared/constants'

export async function middleware(req: NextRequest) {
	const user = await currentUser()

	if (!user) {
		return NextResponse.redirect(new URL(Routes.SIGN_IN, req.url))
	}

	return NextResponse.next()
}

// TODO: Add /payment to matcher
export const config: MiddlewareConfig = {
	matcher: ['/payment','/dashboard/:path*']
}
