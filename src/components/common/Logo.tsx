import { Text } from '@/components/ui'
import { cn } from '@/lib'
import { Routes } from '@/shared/constants'
import Image from 'next/image'
import Link from 'next/link'
import { AnchorHTMLAttributes } from 'react'

interface ILogoProps
	extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
	width?: number
	height?: number
	withText?: boolean
}

export const Logo = ({
	width = 40,
	height = 40,
	withText,
	className,
	...props
}: ILogoProps) => {
	return (
		<Link
			href={Routes.ROOT}
			className={cn(withText && 'flex items-center gap-3', className)}
			{...props}
		>
			<Image src='/logo.png' alt='logo' width={width} height={height} />
			{withText && (
				<Text size={'lg'} weight={700} color={'black'} as='span'>
					Wordly
				</Text>
			)}
		</Link>
	)
}
