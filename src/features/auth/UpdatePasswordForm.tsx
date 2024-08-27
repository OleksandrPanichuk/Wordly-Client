'use client'
import {
	type UpdatePasswordInput,
	updatePasswordSchema,
	useUpdatePasswordMutation
} from '@/api'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const UpdatePasswordForm = ({ code }: { code: string }) => {
	const form = useForm<UpdatePasswordInput>({
		resolver: zodResolver(updatePasswordSchema),
		mode: 'onBlur',
		defaultValues: {
			code
		}
	})

	const { control, handleSubmit } = form

	const { mutate: updatePassword, isPending } = useUpdatePasswordMutation()

	const onSubmit = (values: UpdatePasswordInput) => updatePassword(values)

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-[24.375rem] flex flex-col gap-4 mb-4"
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
					Update
				</Button>
			</form>
		</Form>
	)
}
