'use client'

import { useDeleteProfileMutation } from '@/api'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	Text
} from '@/components/ui'
import { Routes } from '@/constants'
import { useConfirm } from '@/hooks'
import { capitalize, getLanguageName } from '@/lib'
import { useAuth } from '@/providers'
import { EditIcon, GlobeIcon, MailIcon, PersonStandingIcon } from 'lucide-react'
import Link from 'next/link'
import styles from './ProfileView.module.scss'

export const ProfileView = () => {
	const { user } = useAuth()

	const { mutate: deleteProfile, isPending } = useDeleteProfileMutation()
	const [ConfirmDialog, confirm] = useConfirm({
		loading: isPending
	})

	const handleDelete = async () => {
		const ok = await confirm()

		if (!ok) {
			return
		}

		deleteProfile({})
	}

	return (
		<>
		<ConfirmDialog />
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.top}>
					<div>
						<Avatar className={styles.avatar}>
							<AvatarImage src={user?.avatar?.url} alt={user?.username} />
							<AvatarFallback>{user?.username[0]}</AvatarFallback>
						</Avatar>
						<p className={styles.username}>{user?.username}</p>
					</div>
				</div>
				<div className={styles.main}>
					<Button
						asChild
						variant={'primary-outline'}
						size="xs"
						className={styles.editButton}
					>
						<Link href={Routes.EDIT_PROFILE}>
							Edit profile <EditIcon />
						</Link>
					</Button>
					<ul className={styles.infoList}>
						<li>
							<div>
								<MailIcon />
							</div>
							<div>
								<Text size="xl">Email</Text>
								<Text color="blue-450" size="2xl-lg" className={styles.email}>
									{user?.email}
								</Text>
							</div>
						</li>
						{!!user?.nativeLanguage && (
							<li>
								<div>
									<GlobeIcon />
								</div>
								<div>
									<Text size="xl">Native Language</Text>
									<Badge variant={'gray'} className="w-min">
										{getLanguageName(user?.nativeLanguage)}
									</Badge>
								</div>
							</li>
						)}
						{!!user?.gender && (
							<li>
								<div>
									<PersonStandingIcon />
								</div>
								<div>
									<Text size="xl">Gender</Text>
									<Text color="blue-450" size="2xl-lg">
										{capitalize(user?.gender)}
									</Text>
								</div>
							</li>
						)}
					</ul>
				</div>
				<Text size="xs" className={styles.deleteWrapper}>
					If you want to delete your account, click{' '}
					<button className={styles.deleteButton} onClick={handleDelete}>
						here
					</button>
				</Text>
			</div>
		</div></>
	)
}
