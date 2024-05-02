import { notFound } from 'next/navigation'

interface IAuthPageProps {
	searchParams: {
		error: string
	}
}

const AuthPage = ({ searchParams }: IAuthPageProps) => {
	if (searchParams.error === 'google')
		throw new Error('Failed to sign in with google')

	return notFound()
}

export default AuthPage
