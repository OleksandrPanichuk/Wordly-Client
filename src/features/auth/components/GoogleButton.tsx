'use client'
import { SvgIcon } from '@/components/common'
import { Button, Text } from '@/components/ui'
import { AuthApi } from '@/features/auth'

export const GoogleButton = () => {
	return (
		<Button
			variant="outline"
			size="lg"
			className="rounded-[15px] justify-start  min-h-[2.75rem] w-[24.375rem]"
			onClick={AuthApi.signInWithGoogle}
		>
			<SvgIcon name="google" />
			<Text as="span" weight={500}>
				Continue with Google
			</Text>
		</Button>
	)
}
