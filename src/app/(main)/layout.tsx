import { Footer, Header } from "@/components/common"
import { PropsWithChildren } from "react"

const MainLayout = ({children}:PropsWithChildren) => {
	return <div className="flex flex-col min-h-screen">
		<Header />
		<main className='flex-1'>
				{children}
		</main>
		<Footer />
	</div>;
};

export default MainLayout;
