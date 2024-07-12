'use client'

import { Button, Text, Title } from '@/components/ui'
import { Routes } from '@/shared/constants'
import { MailIcon } from 'lucide-react'
import Link from 'next/link'

export const Help = () => {
	return (
		<div className="flex md:items-center md:gap-3 md:flex-row flex-col bg-tw-orange-50 lg:mt-28 mt-16 p-4 xl:p-6 rounded-3xl mb-14 sm:mb-16 lg:mb-28">
			<div className="rounded-full p-5 grid place-items-center bg-tw-blue-200 mb-4 md:mb-0 mx-auto">
				<MailIcon className="size-6 stroke-white" />
			</div>
			<div className="flex-1 flex flex-col gap-3 mb-6 md:mb-0">
				<Title variant={'h4'}>Need help with your subscription?</Title>
				<Text size="base-sm">
					{
						"We're here to help! Contact customer service with any questions or concerns."
					}
				</Text>
			</div>
			<Button
				variant={'primary-outline'}
				size="xl"
				font={'base'}
				weight={500}
				asChild
			>
				<Link href={Routes.CONTACT_US}>Contact Us</Link>
			</Button>
		</div>
	)
}
