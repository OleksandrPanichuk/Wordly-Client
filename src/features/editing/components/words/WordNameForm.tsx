'use client'

import {
	type CreateWordInput,
	createWordSchema,
	useLazyGetWordByNameQuery
} from '@/api'
import {
	Button,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useModalStore } from './CreateWordModal/CreateWordModal.store'
import { Status } from './CreateWordModal/CreateWordModal.types'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const schema = createWordSchema.pick({ name: true })
type TypeFormValues = Pick<CreateWordInput, 'name'>

const getDefaultValues = (): TypeFormValues => {
	return {
		name: useModalStore.getState().values.name ?? ''
	}
}

export const WordNameForm = () => {
	const form = useForm<TypeFormValues>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: getDefaultValues()
	})

	const { fetchData, isLoading } = useLazyGetWordByNameQuery()

	const { setStatus, setValues } = useModalStore((s) => ({
		setStatus: s.setStatus,
		setValues: s.setValues
	}))

	const {
		handleSubmit,
		control,
		reset,
		formState: { isValid }
	} = form

	const onSubmit = async (values: TypeFormValues) => {
		const existingWord = await fetchData(values, ['word-by-name', values.name])

		if (!existingWord) {
			setStatus(Status.WORD_INFO)
			setValues(values)
		} else {
			toast.error('Word with this name already exist')
			reset({ name: '' })
		}
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Provide word name</DialogTitle>
			</DialogHeader>
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-2 mt-4"
				>
					<FormField
						control={control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										placeholder={'Word name'}
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/*TODO:custom loading state*/}
					<Button
						disabled={!isValid || isLoading}
						type="submit"
						className="ml-auto"
					>
						{isLoading && <Loader2 className={'animate-spin mr-1 size-5'} />}
						Next
					</Button>
				</form>
			</Form>
		</>
	)
}
