import { WordsApi } from '@/api'
import { WordInfo } from '@/features/editing'
import { notFound } from 'next/navigation'

interface IEditWordPageProps {
	params: {
		wordId: string
	}
}

const EditWordPage = async ({ params }: IEditWordPageProps) => {
	const data = await WordsApi.getById({ id: params.wordId })

	if (!data) {
		return notFound()
	}

	return (
		<div className={'flex flex-col gap-4 p-4'}>
			<WordInfo wordId={params.wordId} initialData={data} />
		</div>
	)
}

export default EditWordPage
