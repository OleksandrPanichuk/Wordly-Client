'use client'

import {
	Button,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	Input
} from '@/components/ui'
import { SignUpInput, signUpSchema, useSignUpMutation } from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
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

	const { control, handleSubmit } = form
	const { mutate: signUp, isPending } = useSignUpMutation()

	const onSubmit = (values: SignUpInput) => signUp(values)

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-[24.375rem] w-full flex flex-col gap-4 mb-4"
			>
				<FormField
					control={control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input disabled={isPending} {...field} type="password" />
							</FormControl>
							<FormError />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<Input disabled={isPending} {...field} type="password" />
							</FormControl>
							<FormError />
						</FormItem>
					)}
				/>
				<Button
					size="lg"
					loading={isPending}
					disabled={isPending}
					variant="primary"
					className="rounded-[15px] w-full text-base"
				>
					Continue
				</Button>
			</form>
		</Form>
	)
}
