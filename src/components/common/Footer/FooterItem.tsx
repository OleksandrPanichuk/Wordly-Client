'use client'
import { Title } from '@/components/ui'
import { useClickOutside, useDisclosure, useMediaQuery } from '@/hooks'
import { cn } from '@/lib'
import { breakpoints } from '@/shared/constants'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Visibility } from '@/components/common'
import { TypeFooterItem } from './Footer.types'

import styles from './Footer.module.scss'
import { ElementRef, useRef } from 'react'

interface IFooterItemProps {
	title: string
	data: TypeFooterItem[]
}

export const FooterItem = ({ data, title }: IFooterItemProps) => {
	const { isOpen, toggle, close } = useDisclosure(false)
	const [isDisclosure] = useMediaQuery(breakpoints['max-md'])
	const ref  = useRef<ElementRef<'div'>>(null)

	useClickOutside([ref], () => isDisclosure && close())
	
	return (
		<div ref={ref} className={styles.item}>
			<Visibility bp="md">
				<Title weight={500} as="h5" size={'base'} >{title}</Title>
			</Visibility>

			<Visibility bp="max-md">
				<div onClick={toggle}>
					<Title weight={500} as="h5" size={'base'}>{title}</Title>
					<ChevronDown />
				</div>
			</Visibility>
			<ul
				className={cn(
					styles.list,
					isDisclosure && !isOpen && '!max-h-0'
				)}
			>
				{data.map((link) => (
					<li key={link.href}>
						<Link href={link.href} className={styles.link}>{link.text}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
