'use client'
import { authActions } from '@/features/auth'
import { TypeUser } from '@/shared/types'
import { AppStore, makeStore } from '@/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export function StoreProvider({
	children,
	initialUser
}: {
	children: React.ReactNode,
	initialUser: TypeUser | null
}) {
	const storeRef = useRef<AppStore>()
	if (!storeRef.current) {
		storeRef.current = makeStore()
		storeRef.current.dispatch(authActions.initializeUser(initialUser))
	}

	return <Provider store={storeRef.current}>{children}</Provider>
}
