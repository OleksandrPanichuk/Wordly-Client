import { Text } from '@/components/ui'
import { Routes } from '@/shared/constants'
import { MailIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '../Logo'
import { data, mediaLinks, titlesMap } from './Footer.data'
import { TypeFooterKey } from './Footer.types'
import { FooterItem } from './FooterItem'

import styles from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.top}>
				<div className={styles.info}>
					<div>
						<Logo width={48} height={48} />
						<Text weight={700} color={'black'}>
							Wordly
						</Text>
					</div>
					<Text color={'gray-400'}>
						Wordly is a language learning platform that makes your learning
						process faster and easier.
					</Text>
					<div className={styles.email}>
						<MailIcon />
						<Link href="mailto:info@wordly.co" rel="nofollow">
							<Text weight={700} color={'black'} as="span">
								info@wordly.co
							</Text>
						</Link>
					</div>
				</div>
				{Object.entries(data).map(([key, value]) => (
					<FooterItem
						key={key}
						title={titlesMap[key as TypeFooterKey]}
						data={value}
					/>
				))}
			</div>
			<div className={styles.bottom}>
				<div className={styles.bottomContainer}>
					<Text as="small" size={'xs'}>
						Copyright © 2020 Wordly Inc.{' '}
						<span className="hidden md:inline">|</span>
						<br /> All Rights Reserved.{' '}
						<span className="hidden md:inline">|</span>
						<br /> <Link href={Routes.PRIVACY_POLICY}>Privacy Policy</Link>{' '}
						<span>|</span>{' '}
						<Link href={Routes.TERMS_OF_SERVICE}>Terms of Service</Link>
					</Text>

					<div className={styles.socialLinks}>
						{mediaLinks.map((link) => (
							<Link
								href={link.href}
								target="_blank"
								rel="norefferer"
								key={link.href}
							>
								<Image
									src={link.iconPath}
									alt={link.alt}
									width={24}
									height={24}
								/>
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}
