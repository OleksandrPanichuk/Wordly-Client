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

	variant?: 'default' | 'huge'
}

const variants = {
	default: {
		src: '/logo/logo.png',
		width: 40,
		height: 40,
	},
	huge: {
		src: '/logo/logo-huge.png',
		width: 130,
		height: 130,
	},
} as const

export const Logo = ({
	width,
	height,
	withText,
	className,
	variant = 'default',
	...props
}: ILogoProps) => {
	return (
		<Link
			href={Routes.ROOT}
			className={cn(withText && 'flex items-center gap-3', className)}
			{...props}
		>
			<Image
				alt='logo'
				src={variants[variant].src}
				width={width ?? variants[variant].width}
				height={height ?? variants[variant].height}
			/>
			{withText && (
				<Text size={'lg'} weight={700} color={'black'} as='span'>
					Wordly
				</Text>
			)}
		</Link>
	)
}
