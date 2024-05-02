import { TypeUser } from "@/shared/types"
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react"

interface IAuthContext {
	user: TypeUser | null
	setUser: Dispatch<SetStateAction<TypeUser | null>>
}
interface IAuthProviderProps {
	initialUser:TypeUser | null
}


export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({initialUser, children}:PropsWithChildren<IAuthProviderProps>) =>{
	const [user, setUser ] = useState<TypeUser | null>(initialUser)

	return <AuthContext.Provider value={{user, setUser}}>
		{children}
	</AuthContext.Provider>
} 



export const useAuth = () => useContext(AuthContext)

