import { Logo, SvgIcon } from '@/components/common'
import { Separator, Text, Title } from '@/components/ui'
import { formatCurrency } from '@/lib'
import { CirclePercent } from 'lucide-react'
import { useMemo } from 'react'
import { billingPlans } from '@/features/billing'

interface ISelectedPlanProps {
	planId: number
	price: number
}

export const SelectedPlan = ({ planId, price }: ISelectedPlanProps) => {
	const plan = useMemo(
		() => billingPlans.find((el) => el.planId === planId),
		[planId]
	)

	const priceWithoutDiscount =
		Math.ceil((price * (100 + (plan?.discount ?? 0))) / 100) - 0.01

	return (
		<div className="mx-auto bg-tw-blue-50 lg:bg-white lg:shadow-lg rounded-3xl p-6 w-full lg:w-[373px] ">
			<div className="flex items-center gap-3 mb-6">
				<Logo />
				<Title as="h2" size={'2xl'}>
					Wordly Premium
				</Title>
			</div>

			<div className="flex items-center gap-3 mb-4">
				<SvgIcon
					name="dollar-circle"
					stroke="var(--orange-300)"
					fill="transparent"
					width={24}
					height={25}
				/>
				<Text size="base-sm">7 Day money back guarantee</Text>
			</div>
			<div className="flex font-medium justify-between">
				<Text size="lg-base" color="black">
					{plan?.title}
				</Text>
				<Text size="2xl-lg" color="black">
					{priceWithoutDiscount}
				</Text>
			</div>
			{plan?.discount && (
				<div className="mt-6">
					<div className=" flex items-center justify-center text-sm w-[116px] h-[36px] bg-tw-red-alarm text-white rounded-2xl ">
						<CirclePercent className="mr-1.5" />
						{plan.discount}% off
					</div>
					<Text weight={500} size={'2xl-lg'}>
						- {Math.floor(priceWithoutDiscount - price)}
					</Text>
				</div>
			)}

			<Separator className="my-6" />
			<div className="flex justify-between text-lg sm:text-2xl">
				<Text weight={700} as="span" size="2xl-lg" color="black">
					Total
				</Text>
				<Text weight={700} color="black" as="span" size="40px-2xl">
					{formatCurrency(price)}
				</Text>
			</div>
		</div>
	)
}
