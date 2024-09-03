import { Logo } from '@/components/common'
import { Text, Title } from '@/components/ui'
import { Routes } from '@/constants/routes'
import { GoogleButton, SignInForm } from '@/features/auth'
import Link from 'next/link'

const SignInPage = () => {
	return (
		<>
			<Logo className="mb-6" />
			<Title variant={'h1'} color="blue">
				Sign in to Wordly
			</Title>
			<SignInForm />
			<GoogleButton />
			<Text className="mt-3" weight={500}>
				Don&apos;t have an account?{' '}
				<Link
					href={Routes.SIGN_UP}
					className="text-blue-800 hover:text-blue-700 transition"
				>
					Sign Up
				</Link>
			</Text>
		</>
	)
}

export default SignInPage
