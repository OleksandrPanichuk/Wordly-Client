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
import { AuthApi, UpdatePasswordInput, updatePasswordSchema } from '@/services'
import { Routes } from '@/shared/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const UpdatePasswordForm = ({ code }: { code: string }) => {
	const form = useForm<UpdatePasswordInput>({
		resolver: zodResolver(updatePasswordSchema),
		mode: 'onBlur',
		defaultValues: {
			code,
		},
	})

	const router = useRouter()

	const { control, handleSubmit } = form

	const { mutate: updatePassword, isPending } = useMutation({
		mutationFn: AuthApi.updatePassword,
		onSuccess: () => {
			toast.success('Password updated')
			router.push(Routes.SIGN_IN)
		},
		onError: () => {
			toast.error('Failed to update password')
		},
	})

	const onSubmit = (values: UpdatePasswordInput) => updatePassword(values)

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full max-w-[24.375rem] flex flex-col gap-4 mb-4'
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
					variant='primary'
					className='rounded-[15px] w-full text-base'
				>
					Update
				</Button>
			</form>
		</Form>
	)
}
