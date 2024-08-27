'use client'

import {
	type CreateWordInput,
	createWordSchemaWithRefinement,
	useCreateWordMutation
} from '@/api'
import {
	Button,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	ImageDropzone,
	Textarea
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, useForm } from 'react-hook-form'
import { PartOfSpeechSelect } from '@/features/editing'
import { ExamplesInput } from './ExamplesInput'
import { useModalStore } from './CreateWordModal/CreateWordModal.store'
import { Status } from './CreateWordModal/CreateWordModal.types'

const getDefaultValues = (): DefaultValues<CreateWordInput> => {
	const values = useModalStore.getState().values
	const meaning = values.meaning
	return {
		...values,
		meaning: {
			definition: meaning?.definition ?? '',
			examples: !!meaning?.examples?.length ? meaning.examples : [],
			partOfSpeech: meaning?.partOfSpeech
		}
	}
}

export const MeaningForm = () => {
	const { resetValues, values, close, setStatus } = useModalStore()

	const form = useForm<CreateWordInput>({
		resolver: zodResolver(createWordSchemaWithRefinement),
		mode: 'onBlur',
		defaultValues: getDefaultValues()
	})

	const { mutateAsync: createWord } = useCreateWordMutation()

	const {
		handleSubmit,
		control,
		formState: { isValid, isSubmitting }
	} = form

	const onSubmit = async (values: CreateWordInput) => {
		try {
			resetValues()
			await createWord(values)
			close()
		} catch (err) {
			throw err
		}
	}

	const onBack = () => {
		setStatus(Status.WORD_INFO)
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Add first meaning!</DialogTitle>
			</DialogHeader>
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-2 mt-4"
				>
					<FormField
						control={control}
						name="meaning.definition"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Definition*</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										disabled={isSubmitting}
										placeholder="Add definition here"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="meaning.partOfSpeech"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Part of speech*</FormLabel>
								<PartOfSpeechSelect {...field} disabled={isSubmitting} />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={'meaning.image'}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image</FormLabel>
								<ImageDropzone {...field} disabled={isSubmitting} isForm />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="meaning.examples"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Examples</FormLabel>
								<ExamplesInput
									{...field}
									name={values.name?.toLowerCase() ?? ''}
									disabled={isSubmitting}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end gap-2">
						<Button
							variant={'ghost'}
							type="button"
							onClick={onBack}
							disabled={isSubmitting}
						>
							Back
						</Button>
						<Button disabled={!isValid || isSubmitting} type="submit">
							Next
						</Button>
					</div>
				</form>
			</Form>
		</>
	)
}
