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
import { useSignUp } from '@/features/auth'
import { SignUpInput, signUpSchema } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const SignUpForm = () => {
	const form = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
		mode: 'onBlur'
	})

	const { control, handleSubmit } = form
	const { mutate: signUp, isPending } = useSignUp()

	const onSubmit = (values: SignUpInput) => signUp(values)

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-[24.375rem] w-full flex flex-col gap-4 mb-4"
			>
				<FormField
					control={control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input disabled={isPending} {...field} />
							</FormControl>
							<FormError />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input disabled={isPending} {...field} />
							</FormControl>
							<FormError />
						</FormItem>
					)}
				/>
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
					Sign Up
				</Button>
			</form>
		</Form>
	)
}
