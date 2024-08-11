'use client'
import { authActions } from '@/features/auth'
import { store } from '@/store'
import { TypeUser } from '@/types'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export function StoreProvider({
	children,
	initialUser
}: {
	children: React.ReactNode
	initialUser: TypeUser | null
}) {
	// const storeRef = useRef<AppStore>()
	// if (!storeRef.current) {
	// 	storeRef.current = makeStore()
	// 	storeRef.current.dispatch(authActions.initializeUser(initialUser))
	// }

	const initializedRef = useRef<boolean>(false)

	if (!initializedRef.current) {
		initializedRef.current = true
		store.dispatch(authActions.initializeUser(initialUser))
	}

	return <Provider store={store}>{children}</Provider>
}
