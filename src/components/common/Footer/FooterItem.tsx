'use client'
import { Visibility } from '@/components/common'
import { Title } from '@/components/ui'
import { breakpoints } from '@/constants'
import { useClickOutside, useDisclosure, useMediaQuery } from '@/hooks'
import { cn } from '@/lib'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { TypeFooterItem } from './Footer.types'

import { ElementRef, useRef } from 'react'
import styles from './Footer.module.scss'

interface IFooterItemProps {
	title: string
	data: TypeFooterItem[]
}

export const FooterItem = ({ data, title }: IFooterItemProps) => {
	const { isOpen, toggle, close } = useDisclosure(false)
	const [isDisclosure] = useMediaQuery(breakpoints['max-md'])
	const ref = useRef<ElementRef<'div'>>(null)

	useClickOutside([ref], () => isDisclosure && close())

	return (
		<div ref={ref} className={styles.item}>
			<Visibility bp="md">
				<Title weight={500} as="h5" size={'base'}>
					{title}
				</Title>
			</Visibility>

			<Visibility bp="max-md">
				<div onClick={toggle}>
					<Title weight={500} as="h5" size={'base'}>
						{title}
					</Title>
					<ChevronDown />
				</div>
			</Visibility>
			<ul className={cn(styles.list, isDisclosure && !isOpen && '!max-h-0')}>
				{data.map((link) => (
					<li key={link.href}>
						<Link href={link.href} className={styles.link}>
							{link.text}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
