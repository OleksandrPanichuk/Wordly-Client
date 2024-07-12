import { SvgIcon } from '@/components/common'
import { RefreshCwIcon } from 'lucide-react'
import { TypePlan } from '../types'

const commonFeatures: TypePlan['features'] = [
	{
		icon: (
			<SvgIcon
				name="dollar-circle"
				stroke="var(--orange-300)"
				fill="transparent"
				width={24}
				height={25}
			/>
		),
		text: '7 Day money back guarantee'
	},
	{
		icon: (
			<SvgIcon
				name="receipt-discount"
				stroke="var(--orange-300)"
				fill="transparent"
				width={24}
				height={25}
			/>
		),
		text: 'VAT may apply'
	}
]

export const plans: TypePlan[] = [
	{
		planId: 305545,
		title: '3 Months',
		features: [
			...commonFeatures,
			{
				icon: (
					<RefreshCwIcon stroke="var(--orange-300)" width={24} height={25} />
				),
				text: 'With auto renewal'
			}
		],
		isPopular: true
	},
	{
		planId: 305552,
		title: '1 Year',
		isBestOffer: true,
		discount: 30,
		features: [
			...commonFeatures,
			{
				icon: (
					<RefreshCwIcon stroke="var(--orange-300)" width={24} height={25} />
				),
				text: 'With auto renewal'
			}
		]
	},
	{
		planId: 305559,
		title: 'Unlimited',
		discount: 50,
		features: [...commonFeatures]
	}
]
