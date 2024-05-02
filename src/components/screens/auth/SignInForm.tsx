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
import { useSignIn } from '@/services'
import { SignInInput, signInSchema } from '@/services/dto'
import { Routes } from '@/shared/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export const SignInForm = () => {
	const form = useForm<SignInInput>({
		resolver: zodResolver(signInSchema),
		mode: 'onBlur',
	})
	const router = useRouter()

	const { control, handleSubmit } = form
	const { mutate: signIn, isPending } = useSignIn({
		onSuccess: () => router.push(Routes.ROOT),
	})

	const onSubmit = (values: SignInInput) => signIn(values)

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-[24.375rem] w-full flex flex-col gap-4 mb-4'
			>
				<FormField
					control={control}
					name='email'
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
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input disabled={isPending} {...field} type='password' />
							</FormControl>
								<FormError />
							<div className="w-full flex justify-end">
							<Link
								href={Routes.RESET_PASSWORD}
								className='hover:text-tw-blue-500 transition '
							>
								Forgot password?
							</Link>
							</div>
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
					Sign In
				</Button>
			</form>
		</Form>
	)
}
