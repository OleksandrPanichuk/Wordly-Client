import { Logo } from "@/components/common"
import { GoogleButton, SignUpForm } from "@/features/auth"
import { Text, Title } from "@/components/ui"
import { Routes } from "@/shared/constants"
import Link from "next/link"

const SignUpPage = () => {
	return (
		<>
			<Logo className='mb-6' />
			<Title variant={'h1'} color='blue'>
				Sign up to Wordly
			</Title>
			<SignUpForm />
			<GoogleButton />
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

export default SignUpPage
