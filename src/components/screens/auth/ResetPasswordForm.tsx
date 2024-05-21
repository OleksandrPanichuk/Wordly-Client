'use client'
import {
	Button,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	Input,
} from '@/components/ui'
import { useMutation } from '@/hooks'
import { AuthApi, ResetPasswordInput, resetPasswordSchema } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const ResetPasswordForm = () => {
	const form = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema),
	})

	const { mutate: resetPassword, isPending } = useMutation({
		mutationFn: AuthApi.resetPassword,
		onSuccess: () => {
			toast.success('Please, check your email')
		},
		onError: () => {
			toast.error('Something went wrong')
		},
	})

	const onSubmit = (values: ResetPasswordInput) => resetPassword(values)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full max-w-[24.375rem] flex flex-col gap-4 mb-4'
			>
				<FormField
					control={form.control}
					name='email'
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
					size='lg'
					loading={isPending}
					disabled={isPending}
					variant='primary'
					className='rounded-[15px] w-full text-base'
				>
					Send
				</Button>
			</form>
		</Form>
	)
}
