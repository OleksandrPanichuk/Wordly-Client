'use client'

import { Form, FormError, FormField, FormControl, FormLabel, FormItem, Input, Button } from '@/components/ui'
import { SignUpInput, signUpSchema, useSignUp } from '@/services'
import { Routes } from '@/shared/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface ICreatePasswordFormProps {
	email: string
	username: string
	avatarUrl?: string
}

export const CreatePasswordForm = (googleData: ICreatePasswordFormProps) => {
	const form = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
		defaultValues: googleData,
		mode: 'onBlur'
	})
	const router = useRouter()

	const { control, handleSubmit } = form
	const { mutate: signUp, isPending } = useSignUp({
		onSuccess:() => router.push(Routes.ROOT)
	})

	const onSubmit = (values: SignUpInput) => signUp(values)

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-[24.375rem] w-full flex flex-col gap-4 mb-4'
			>
				<FormField
					control={control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input disabled={isPending} {...field} type='password' />
							</FormControl>
							<FormError />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<Input disabled={isPending} {...field} type='password' />
							</FormControl>
							<FormError />
						</FormItem>
					)}
				/>
				<Button
					size='lg'
					loading={isPending}
					disabled={isPending}
					variant="primary"
					className='rounded-[15px] w-full text-base'
				>
					Continue
				</Button>
			</form>
		</Form>
	)
}
