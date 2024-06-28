'use client'
import { ImageSlider } from '@/features/auth'
import { useAuth } from '@/providers'
import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
	const { user } = useAuth()

	if(user) return null
	
	return (
		<div className='flex '>
			<ImageSlider />
			<div className='flex-1 self-start py-8 flex  items-center justify-center min-h-screen'>
				<div className='flex flex-col items-center h-full w-full px-4'>{children}</div>
			</div>
		</div>
	)
}

export default AuthLayout
