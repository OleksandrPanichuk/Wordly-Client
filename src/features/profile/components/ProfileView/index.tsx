'use client'

import { ConfirmModal } from '@/components/modals'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	Text
} from '@/components/ui'
import { selectAuthUser } from '@/features/auth'
import { useDeleteProfile } from '@/features/profile'
import { capitalizeOnlyFirstLetter } from '@/lib'
import { useAppSelector } from '@/store'
import { EditIcon, GlobeIcon, MailIcon, PersonStandingIcon } from 'lucide-react'
import styles from './ProfileView.module.scss'

export const ProfileView = () => {
	const user = useAppSelector(selectAuthUser)!

	const { mutate: deleteProfile, isPending } = useDeleteProfile()

	const handleDelete = () => {
		deleteProfile({})
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.top}>
					<div>
						<Avatar className={styles.avatar}>
							<AvatarImage src={user.avatar?.url} alt={user.username} />
							<AvatarFallback>{user.username[0]}</AvatarFallback>
						</Avatar>
						<p className={styles.username}>{user.username}</p>
					</div>
				</div>
				<div className={styles.main}>
					<Button variant={'primary-outline'} size="xs" className="self-end rounded-x;">
						Edit profile <EditIcon />
					</Button>
					<ul className={styles.infoList}>
						<li>
							<div>
								<MailIcon />
							</div>
							<div>
								<Text size="xl">Email</Text>
								<Text color="blue-450" size="2xl-lg" className="line-clamp-1 break-all">
									{user.email}
								</Text>
							</div>
						</li>
						{!!user.nativeLanguages?.length && (
							<li>
								<div>
									<GlobeIcon />
								</div>
								<div>
									<Text size="xl">Native Languages</Text>
									<ul className="flex gap-1 flex-wrap">
										{user.nativeLanguages.slice(0, 3).map((language) => (
											<li key={language}>
												<Badge variant={'gray'}>{language}</Badge>
											</li>
										))}
										{user.nativeLanguages.length - 3 > 0 && (
											<li>
												<Badge
													variant={'gray'}
												>{`+${user.nativeLanguages.length - 3} more`}</Badge>
											</li>
										)}
									</ul>
								</div>
							</li>
						)}
						{!!user.gender && (
							<li>
								<div>
									<PersonStandingIcon />
								</div>
								<div>
									<Text size="xl">Gender</Text>
									<Text color="blue-450" size="2xl-lg">
										{capitalizeOnlyFirstLetter(user.gender)}
									</Text>
								</div>
							</li>
						)}
					</ul>
				</div>
				<Text size="xs" className={styles.deleteWrapper}>
					If you want to delete your account, click{' '}
					<ConfirmModal loading={isPending} onConfirm={handleDelete}>
						<button className={styles.deleteButton}>here</button>
					</ConfirmModal>
				</Text>
			</div>
		</div>
	)
}
