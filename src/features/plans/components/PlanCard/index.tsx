'use client'

import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Skeleton
} from '@/components/ui'
import { Routes } from '@/constants'
import { TypeSubscription } from '@/features/billing'
import { TextBox, type TypePlan } from '@/features/plans'
import { formatCurrency } from '@/lib'
import { useAuth } from '@/providers'
import { getProduct, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { getFormattedPrice, getPriceWithoutDiscount } from './PlanCard.helpers'
import styles from './PlanCard.module.scss'

interface IPlanCardProps {
	plan: TypePlan
	subscription: TypeSubscription | null
}

export const PlanCard = ({ plan, subscription }: IPlanCardProps) => {
	const { user } = useAuth()

	const router = useRouter()

	useEffect(() => {
		lemonSqueezySetup({
			apiKey: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY,
			onError: (err) =>
				console.error('Failed to connect to lemon squeezy: ', err)
		})
	}, [])

	const { data, isPending } = useQuery({
		queryKey: ['plan', plan.planId],
		queryFn: async () => {
			const response = await getProduct(plan.planId)

			if (response.error) {
				toast.error('Failed to get plan details')
				throw response.error
			}

			if (!response.data) {
				toast.error('Failed to get plan details')
				throw new Error('Failed tp get plan details')
			}

			return response.data.data
		}
	})

	const price = getFormattedPrice(data?.attributes.price)
	const description = data?.attributes.description

	const priceWithoutDiscount = getPriceWithoutDiscount(
		price,
		plan.discount,
		isPending
	)

	return (
		<Card className={styles.wrapper}>
			<CardHeader>
				<CardTitle>{plan.title}</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				{isPending ? (
					<Skeleton className={'w-[75%] h-[54px] lg:h-[66px]'} />
				) : (
					<div>
						<div className="flex gap-2 items-center">
							<span className="lg:text-4xl text-xl text-black font-bold font-noto-sans">
								{formatCurrency(price!)}
							</span>
							{plan.discount && (
								<span className="lg:text-2xl text-lg line-through text-gray-600">
									{formatCurrency(priceWithoutDiscount!)}
								</span>
							)}
						</div>
						<div
							className="text-xs lg:text-sm mt-1.5 font-noto-sans font-medium"
							dangerouslySetInnerHTML={{ __html: description ?? '' }}
						/>
					</div>
				)}
				<ul className={styles.features}>
					{plan.features.map((feature, index) => (
						<li key={index}>
							{feature.icon}
							<p>{feature.text}</p>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="flex justify-end mt-6">
				<Button
					variant={plan.isBestOffer ? 'primary' : 'primary-outline'}
					size="xl"
					font={'base'}
					weight={500}
					className="sm:w-[200px] font-noto-sans"
					disabled={!!subscription}
					onClick={() =>
						router.push(
							user ? `${Routes.PAYMENT}?planId=${plan.planId}` : Routes.SIGN_IN
						)
					}
				>
					{user ? 'Upgrade' : 'Sign In'}
				</Button>
			</CardFooter>
			<div className="absolute right-[-6px] top-4 flex flex-col gap-1 items-end">
				{plan.isPopular && (
					<TextBox color="purple" className={styles['box-popular']}>
						Most popular
					</TextBox>
				)}
				{plan.isBestOffer && (
					<TextBox color="lightblue" className={styles['box-best-offer']}>
						Best Offer
					</TextBox>
				)}
				{plan.discount && (
					<TextBox color="red" className={styles['box-discount']}>
						%{plan.discount} Off
					</TextBox>
				)}
			</div>
		</Card>
	)
}
