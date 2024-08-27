'use client'

import { wordTranscriptionSchema } from '@/api'
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
	Input
} from '@/components/ui'
import { FormErrors } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { XCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useModalStore } from './CreateWordModal/CreateWordModal.store'
import { Status } from './CreateWordModal/CreateWordModal.types'

type TypeFormValues = z.infer<typeof wordTranscriptionSchema>

const getDefaultValues = (): TypeFormValues => {
	const transcription = useModalStore.getState().values.transcription
	return {
		en: transcription?.en ?? '',
		us: transcription?.us ?? ''
	}
}

export const WordTranscriptionForm = () => {
	const form = useForm<TypeFormValues>({
		resolver: zodResolver(wordTranscriptionSchema),
		mode: 'onChange',
		defaultValues: getDefaultValues()
	})

	const { setStatus, setValues } = useModalStore((s) => ({
		setStatus: s.setStatus,
		setValues: s.setValues
	}))

	const {
		handleSubmit,
		control,
		setError,
		clearErrors,
		watch,
		formState: { errors, isValid, touchedFields }
	} = form

	const onSubmit = async (values: TypeFormValues) => {
		setStatus(Status.MEANINGS)
		setValues({
			transcription: values
		})
	}

	const onBack = () => {
		setStatus(Status.NAME_CHECK)
	}

	const values = watch()

	useEffect(() => {
		if (!values.en && !values.us && (touchedFields.en || touchedFields.us)) {
			setError('root', { message: FormErrors.invalid.word.transcription })
		} else {
			clearErrors('root')
		}
	}, [values.en, values.us, setError, clearErrors, touchedFields])

	return (
		<>
			<DialogHeader>
				<DialogTitle>Provide word info</DialogTitle>
			</DialogHeader>
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-2 mt-4"
				>
					<FormField
						control={control}
						name="en"
						render={({ field }) => (
							<FormItem>
								<FormLabel>EN Transcription(optional)</FormLabel>
								<FormControl>
									<Input {...field} placeholder={'EN transcription'} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="us"
						render={({ field }) => (
							<FormItem>
								<FormLabel>US Transcription(optional)</FormLabel>
								<FormControl>
									<Input {...field} placeholder={'US transcription'} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{errors.root?.message && (
						<div className="flex items-center font-medium  text-xs text-rose-500 p-2 border border-rose-500 bg-rose-500/10 rounded-sm">
							<XCircle className="h-4 w-4 mr-2" />
							{errors.root?.message}
						</div>
					)}
					<div className="flex justify-end gap-2">
						<Button variant={'ghost'} type="button" onClick={onBack}>
							Back
						</Button>
						<Button disabled={!isValid} type="submit">
							Next
						</Button>
					</div>
				</form>
			</Form>
		</>
	)
}
