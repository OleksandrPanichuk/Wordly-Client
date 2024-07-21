'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Text,
	Title
} from '@/components/ui'
import {
	BillingInfoInput,
	billingInfoSchema,
	CountrySelect,
	useAddBillingInfo,
	useCheckoutMutation,
	useGetBillingInfo,
	useUpdateBillingInfo
} from '@/features/billing'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { isDeepStrictEqual } from 'util'

interface IBillingInfoFormProps {
	planId: number
}

export const BillingInfoForm = ({ planId }: IBillingInfoFormProps) => {
	const form = useForm<BillingInfoInput>({
		resolver: zodResolver(billingInfoSchema),
		mode: 'onBlur'
	})

	const { data: billingInfoFromDB } = useGetBillingInfo({
		onSuccess: (billingInfo) => {
			form.reset(billingInfo)
		}
	})

	const { mutateAsync: getCheckoutUrl } = useCheckoutMutation()
	const { mutateAsync: createBillingInfo } = useAddBillingInfo()
	const { mutateAsync: updateBillingInfo } = useUpdateBillingInfo()

	const { control, handleSubmit } = form

	const onSubmit = async (values: BillingInfoInput) => {
		if (!billingInfoFromDB) {
			await createBillingInfo(values)
		}

		if (billingInfoFromDB && !isDeepStrictEqual(billingInfoFromDB, values)) {
			await updateBillingInfo({
				id: billingInfoFromDB.id,
				...values
			})
		}

		const url = await getCheckoutUrl(planId)
		window.location.href = url
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Title>Billing information</Title>
				<Text>This information would be on your invoice</Text>
				<div className="grid grid-cols-2">
					<FormField
						control={control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										variant="secondary"
										placeholder="First name"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										variant={'secondary'}
										placeholder="Last name"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name="country"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<CountrySelect {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}
