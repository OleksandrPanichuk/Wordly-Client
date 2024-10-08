'use client'

import {
	type BillingInfoInput,
	billingInfoSchema,
	useAddBillingInfoMutation,
	useCheckoutMutation,
	useGetBillingInfoQuery,
	useUpdateBillingInfoMutation
} from '@/api'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input
} from '@/components/ui'
import {
	billingPlans,
	CountrySelect,
	PhoneNumberInput
} from '@/features/billing'
import { getCountryCode, getCountryName } from '@/lib'
import { useAuth } from '@/providers'
import { TypeCountryCode } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import isEqual from 'lodash.isequal'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface IBillingInfoFormProps {
	planId?: number
}

export const BillingInfoForm = ({ planId }: IBillingInfoFormProps) => {
	const { user } = useAuth()

	const form = useForm<BillingInfoInput>({
		resolver: zodResolver(billingInfoSchema),
		mode: 'onBlur',
		defaultValues: {
			email: user?.email
		}
	})

	const {
		control,
		handleSubmit,
		watch,
		reset,
		formState: { isSubmitting }
	} = form

	const { data: billingInfoFromDB } = useGetBillingInfoQuery()

	useEffect(() => {
		if (billingInfoFromDB) {
			reset({
				...billingInfoFromDB,
				country: getCountryName(billingInfoFromDB.country as TypeCountryCode),
				email: billingInfoFromDB.email ?? user?.email
			})
		}
	}, [reset, billingInfoFromDB, user?.email])

	const { mutateAsync: getCheckoutUrl } = useCheckoutMutation()
	const { mutateAsync: createBillingInfo } = useAddBillingInfoMutation()
	const { mutateAsync: updateBillingInfo } = useUpdateBillingInfoMutation()

	const onSubmit = async (values: BillingInfoInput) => {
		const country = getCountryCode(values.country)

		if (!country) {
			return toast.error('Invalid country')
		}

		if (!billingInfoFromDB) {
			await createBillingInfo({
				...values,
				country
			})
		}

		const compareObject = { ...billingInfoFromDB, country }
		delete compareObject.userId
		delete compareObject.id

		if (billingInfoFromDB && !isEqual(compareObject, values)) {
			await updateBillingInfo({
				...values,
				id: billingInfoFromDB.id,
				country
			})
		}

		if (planId) {
			const url = await getCheckoutUrl(
				billingPlans.find((el) => el.planId === planId)!.variantId
			)
			window.location.href = url
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col xs:grid grid-cols-2 w-full gap-x-3 gap-y-6"
			>
				<FormField
					control={control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									variant="secondary"
									placeholder="First name"
									disabled={isSubmitting}
									{...field}
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
									variant={'secondary'}
									placeholder="Last name"
									disabled={isSubmitting}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="country"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl>
								<CountrySelect
									{...field}
									disabled={isSubmitting}
									isInvalid={fieldState.invalid}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isSubmitting}
									variant={'secondary'}
									placeholder="City"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="phoneNumber"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl>
								<PhoneNumberInput
									{...field}
									isInvalid={fieldState.invalid}
									disabled={isSubmitting}
									country={watch('country')}
									billingInfoFromDB={billingInfoFromDB}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isSubmitting}
									variant={'secondary'}
									placeholder="Email"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="address"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormControl>
								<Input
									{...field}
									disabled={isSubmitting}
									variant={'secondary'}
									placeholder="Address"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="postalCode"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormControl>
								<Input
									{...field}
									variant={'secondary'}
									placeholder="Postal code"
									disabled={isSubmitting}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					font={'base'}
					size="xl"
					variant="primary-outline"
					className="col-span-2"
					disabled={isSubmitting}
				>
					{planId ? 'Proceed' : 'Save'}
				</Button>
			</form>
		</Form>
	)
}
