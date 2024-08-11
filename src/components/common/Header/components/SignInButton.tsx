import { Visibility } from '@/components/common'
import { Button } from '@/components/ui'
import { Routes } from '@/constants'
import { UserIcon } from 'lucide-react'
import Link from 'next/link'

export const SignInButton = () => {
	return (
		<Visibility bp="lg">
			<Button
				font="base"
				variant={'primary'}
				className="px-5 max-lg:hidden"
				asChild
			>
				<Link href={Routes.SIGN_IN}>
					<UserIcon />
					Sign In
				</Link>
			</Button>
		</Visibility>
	)
}
