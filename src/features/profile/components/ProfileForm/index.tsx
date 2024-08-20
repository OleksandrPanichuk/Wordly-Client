'use client'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui'
import {
	AvatarInput,
	GenderSelect,
	NativeLanguageSelect
} from '@/features/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import {
	type UpdateProfileInput,
	updateProfileSchema,
	useUpdateProfileMutation
} from '@/api'
import { getDefaultValues } from './ProfileForm.helpers'
import styles from './ProfileForm.module.scss'

export const ProfileForm = () => {
	const router = useRouter()

	const form = useForm<UpdateProfileInput>({
		resolver: zodResolver(updateProfileSchema),
		mode: 'onBlur',
		defaultValues: getDefaultValues()
	})

	const {
		handleSubmit,
		control,
		reset,
		formState: { isValid, isDirty }
	} = form

	const { mutate: updateProfile, isPending } = useUpdateProfileMutation()

	const onSubmit = (values: UpdateProfileInput) => updateProfile(values)

	const handleBack = () => {
		reset(getDefaultValues())
		router.back()
	}

	return (
		<div className={styles.wrapper}>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<AvatarInput control={control} disabled={isPending} />
					<FormField
						control={control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="Enter your display name"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className={styles.group}>
						<NativeLanguageSelect control={control} disabled={isPending} />
						<GenderSelect control={control} disabled={isPending} />
					</div>
					<div className={styles.bottom}>
						<Button
							type="reset"
							onClick={handleBack}
							variant={'ghost'}
							disabled={isPending}
						>
							Back
						</Button>
						<Button
							className={styles.button}
							type="submit"
							disabled={!isDirty || !isValid || isPending}
						>
							Save
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
