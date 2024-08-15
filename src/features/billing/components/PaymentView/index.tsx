'use client'

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator
} from '@/components/ui'
import { billingReasonMap } from '@/constants'
import { capitalize, formatCurrency, toDateString } from '@/lib'
import { TypePayment } from '@/types'
import { Product, Variant } from '@lemonsqueezy/lemonsqueezy.js'
import { format } from 'date-fns'
import { billingPlans } from '@/features/billing'
import { getNextPaymentDate } from './PaymentView.helpers'

interface IPaymentViewProps {
	variant: Variant
	product: Product
	payment: TypePayment
}

export const PaymentView = ({
	payment,
	variant,
	product
}: IPaymentViewProps) => {
	const title = billingPlans.find(
		(el) => el.planId.toString() === product.data.id
	)!.title

	const nextPaymentDate = getNextPaymentDate({
		createdAt: payment.createdAt,
		interval: variant.data.attributes.interval,
		intervalCount: variant.data.attributes.interval_count
	})

	return (
		<div className="p-4 h-full bg-tw-blue-50">
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<div>
						<div className="flex items-center gap-2">
							<p>Billing reason:</p>
							<Badge variant={billingReasonMap[payment.billingReason]}>
								{capitalize(payment.billingReason)}
							</Badge>
						</div>
						<p>
							Subtotal:{' '}
							<span className="font-semibold">
								{formatCurrency(payment.subtotal)}
							</span>
						</p>
						<p>
							Tax:{' '}
							<span className="font-semibold">
								{formatCurrency(payment.tax)}
							</span>
						</p>
						<p>
							Total:{' '}
							<span className="font-semibold">
								{formatCurrency(payment.total)}
							</span>
						</p>
					</div>
					<Separator />
					<div>
						<p>
							Payment date:{' '}
							<time
								className="font-semibold"
								dateTime={toDateString(payment.createdAt)}
							>
								{format(payment.createdAt, 'MMM d, yyyy')}
							</time>
						</p>
						{nextPaymentDate && (
							<p>
								Next payment date:{' '}
								<time
									className="font-semibold"
									dateTime={toDateString(nextPaymentDate)}
								>
									{format(nextPaymentDate, 'MMM d, yyyy')}
								</time>
							</p>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
