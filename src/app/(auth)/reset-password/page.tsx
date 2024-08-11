import { Logo } from '@/components/common'
import { Text, Title } from '@/components/ui'
import { Routes } from '@/constants'
import { ResetPasswordForm } from '@/features/auth'
import Link from 'next/link'

const ResetPasswordPage = () => {
	return (
		<>
			<Logo className="mb-6" />
			<Title variant={'h1'} color="blue">
				Reset password
			</Title>
			<ResetPasswordForm />
			<Text className="mt-3" weight={500}>
				Back to{' '}
				<Link
					href={Routes.SIGN_IN}
					className="text-blue-800 hover:text-blue-700 transition"
				>
					Sign In
				</Link>
			</Text>
		</>
	)
}

export default ResetPasswordPage
