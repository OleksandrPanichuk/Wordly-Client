'use client'

import {
	UpdateWordInput,
	updateWordSchema,
	useGetWordByIdQuery,
	useUpdateWordMutation
} from '@/api'
import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui'
import { WordActions } from '@/features/editing'
import { UserRole, type TypeWord } from '@/types'

import { useAuth } from '@/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import styles from './WordInfo.module.scss'

interface IWordInfoProps {
	initialData?: TypeWord
	wordId: string
}

type TypeFormValues = Omit<UpdateWordInput, 'id' | 'isAdmin'>

export const WordInfo = ({ initialData, wordId }: IWordInfoProps) => {
	const { data } = useGetWordByIdQuery(
		{ id: wordId },
		{
			initialData
		}
	)

	const form = useForm<TypeFormValues>({
		resolver: zodResolver(updateWordSchema),
		defaultValues: {
			name: data?.name,
			transcription: {
				us: data?.transcription.us ?? '',
				en: data?.transcription.en ?? ''
			}
		},
		mode: 'onBlur'
	})

	const { mutate: updateWord } = useUpdateWordMutation()
	const { user } = useAuth()

	if (!data) {
		return null
	}

	const {
		control,
		handleSubmit,
		formState: { isValid, isDirty, isSubmitting }
	} = form

	const onSubmit = (values: TypeFormValues) =>
		updateWord(
			{
				id: wordId,
				isAdmin: user?.role === UserRole.ADMIN,
				...values
			},
			{
				onSuccess: ({ data }) => {
					form.reset(data)
				}
			}
		)

	return (
		<Card>
			<CardHeader className={styles.header}>
				<CardTitle className={styles.title}>Word info</CardTitle>
				<WordActions
					creatorId={data.creatorId}
					wordId={wordId}
					canGoEdit={false}
				/>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent>
						<FormField
							control={control}
							name={'name'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Word name</FormLabel>
									<FormControl>
										<Input {...field} disabled={isSubmitting} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="transcription.en"
							render={({ field }) => (
								<FormItem>
									<FormLabel>EN Transcription</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ''}
											placeholder={'EN transcription'}
											disabled={isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="transcription.us"
							render={({ field }) => (
								<FormItem>
									<FormLabel>US Transcription</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ''}
											placeholder={'US transcription'}
											disabled={isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className={styles.footer}>
						<Button disabled={!isValid || !isDirty || isSubmitting}>
							Save
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}
