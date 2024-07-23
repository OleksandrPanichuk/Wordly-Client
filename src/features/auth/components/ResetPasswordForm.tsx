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
import {
	ResetPasswordInput,
	resetPasswordSchema,
	useResetPassword
} from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const ResetPasswordForm = () => {
	const form = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema)
	})

	const { mutate: resetPassword, isPending } = useResetPassword()

	const onSubmit = (values: ResetPasswordInput) => resetPassword(values)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-[24.375rem] flex flex-col gap-4 mb-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your email</FormLabel>
							<FormControl>
								<Input disabled={isPending} {...field} />
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
					Send
				</Button>
			</form>
		</Form>
	)
}
