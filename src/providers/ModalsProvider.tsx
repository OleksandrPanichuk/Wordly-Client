import { useEffect, useState } from 'react'
import { ExamplesModal } from '@/components/modals'

export const ModalsProvider = () => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<>
			<ExamplesModal />
		</>
	)
}
