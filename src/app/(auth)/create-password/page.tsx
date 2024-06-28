import { Logo } from '@/components/common'

import { CreatePasswordForm } from '@/features/auth'
import { Text, Title } from '@/components/ui'
import { Routes } from '@/shared/constants'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface IPageProps {
	searchParams: {
		email: string
		username: string
		avatarUrl?: string
	}
}

const CreatePasswordPage = ({ searchParams }: IPageProps) => {
	if (!searchParams.email || !searchParams.username) return notFound()
	return (
		<>
			<Logo className='mb-6' />
			<Title variant={'h1'} color='blue'>
				Create password
			</Title>
			<CreatePasswordForm {...searchParams} />
			<Text className='mt-3' weight={500}>
				Already has an account?{' '}
				<Link
					href={Routes.SIGN_IN}
					className='text-blue-800 hover:text-blue-700 transition'
				>
					Sign In
				</Link>
			</Text>
		</>
	)
}

export default CreatePasswordPage
