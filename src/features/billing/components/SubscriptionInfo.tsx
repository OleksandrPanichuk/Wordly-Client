'use client'

import { Button, Text, Title } from '@/components/ui'
import { Routes } from '@/constants'
import { TypeSubscription } from '@/types'
import {
	getSubscription,
	lemonSqueezySetup
} from '@lemonsqueezy/lemonsqueezy.js'
import Link from 'next/link'
import { useEffect } from 'react'

interface ISubscriptionInfoProps {
	data: TypeSubscription | undefined
}

export const SubscriptionInfo = ({ data }: ISubscriptionInfoProps) => {
	useEffect(() => {
		lemonSqueezySetup({
			apiKey: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY!
		})
	}, [])
	const handleManage = async () => {
		if (!data) {
			return
		}

		const lemonSqueezySubscription = await getSubscription(
			data.lsSubscriptionId
		)

		const lsData = lemonSqueezySubscription.data?.data

		if (!lsData) {
			return
		}

		const url = lsData.attributes.urls.customer_portal
		window.location.href = url
	}
	return (
		<section className="space-y-4">
			<Title as="h4" size={'3xl'}>
				Subscription
			</Title>
			{data ? (
				<Button variant={'violet'} size={'xl'} onClick={handleManage}>
					Manage Subscription
				</Button>
			) : (
				<>
					<Text>You don&apos;t have a premium subscription.</Text>
					<Button asChild variant={'violet'} size={'xl'} className="rounded-xl">
						<Link href={Routes.PREMIUM}>Update to Premium</Link>
					</Button>
				</>
			)}
		</section>
	)
}
