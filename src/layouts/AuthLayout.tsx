'use client'
import { Routes } from '@/constants'
import { ImageSlider } from '@/features/auth'
import { useAuth } from '@/providers'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export const AuthLayout = ({ children }: PropsWithChildren) => {
	const { user } = useAuth()

	if (user) return redirect(Routes.ROOT)

	return (
		<div className="flex ">
			<ImageSlider />
			<div className="flex-1 self-start py-8 flex  items-center justify-center min-h-screen">
				<div className="flex flex-col items-center h-full w-full px-4">
					{children}
				</div>
			</div>
		</div>
	)
}
