import { Logo } from '@/components/common'
import { UpdatePasswordForm } from '@/components/screens/auth'
import { Text, Title } from '@/components/ui'
import { Routes } from '@/shared/constants'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const UpdatePasswordPage = ({
	searchParams,
}: {
	searchParams: { code: string }
}) => {
	if (!searchParams.code) return notFound()
	return (
		<>
			<Logo className='mb-6' />
			<Title variant={'h1'} color='blue'>
				Update password
			</Title>
			<UpdatePasswordForm code={searchParams.code} />
			<Text className='mt-3' weight={500}>
				Back to{' '}
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

export default UpdatePasswordPage
