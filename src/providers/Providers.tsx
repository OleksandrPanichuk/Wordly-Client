
import { PropsWithChildren } from "react"
import { QueryProvider } from "./QueryProvider"
import { StoreProvider } from "./StoreProvider"
import { currentUser } from "@/features/profile"
import { Toaster } from "sonner"


export const Providers = async ({children}:PropsWithChildren) => {
	const user = await currentUser()
	return <QueryProvider>
		<StoreProvider initialUser={user}>
		<Toaster richColors expand />
			{children}
		</StoreProvider>
	</QueryProvider>
}