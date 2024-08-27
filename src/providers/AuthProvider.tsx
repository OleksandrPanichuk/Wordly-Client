'use client'

import { useSafeContext } from '@/hooks'
import { TypeUser } from '@/types'
import { type ReactNode, createContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createStore, StoreApi } from 'zustand/vanilla'

type AuthState = {
	user: TypeUser | null
}

type AuthActions = {
	setUser: (user: TypeUser | null) => void
	removeUser: () => void
}

type AuthStoreApi = ReturnType<typeof createAuthStore>

interface AuthProviderProps {
	children: ReactNode
	initialUser: TypeUser | null
}

export type AuthStore = AuthState & AuthActions

const defaultInitState: AuthState = {
	user: null
}

const createAuthStore = (initState: AuthState = defaultInitState) => {
	return createStore<AuthStore>()((set) => ({
		...initState,
		setUser: (user) => set({ user }),
		removeUser: () => set({ user: null })
	}))
}

const AuthStoreContext = createContext<AuthStoreApi>({} as AuthStoreApi)

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
	const storeRef = useRef<AuthStoreApi>()
	if (!storeRef.current) {
		storeRef.current = createAuthStore({ user: initialUser })
	}

	return (
		<AuthStoreContext.Provider value={storeRef.current}>
			{children}
		</AuthStoreContext.Provider>
	)
}

export const useAuth = (): AuthStore => {
	const authStoreContext = useSafeContext(AuthStoreContext)
	return useStore(authStoreContext, (s) => s)
}

export const useAuthStore = (): StoreApi<AuthStore> => {
	return useSafeContext(AuthStoreContext)
}