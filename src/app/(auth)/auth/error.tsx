'use client'

const Error = ({
	error,
}: {
	error: Error & { digest?: string }
}) => {
	return <div>{error.message}</div>
}

export default Error
