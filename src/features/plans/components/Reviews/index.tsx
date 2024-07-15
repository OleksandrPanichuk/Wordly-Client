'use client'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Rating,
	Text,
	Title
} from '@/components/ui'
import { cn } from '@/lib'
import { Swiper, SwiperSlide } from 'swiper/react'

import { swiperSettings } from './Reviews.config'
import { reviews } from './Reviews.data'
import styles from './Reviews.module.scss'

import { SvgIcon } from '@/components/common'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

export const Reviews = () => {
	return (
		<div className={styles.wrapper}>
			<div className="page__container">
				<Title size="2xl" as="h3" className="text-center mb-6">
					What our customers say
				</Title>
				<Swiper className={styles.slider} {...swiperSettings}>
					{reviews.map((review) => (
						<SwiperSlide className={styles.slideWrapper} key={review.id}>
							{({ isActive }) => (
								<>
									<SvgIcon className={cn(styles.quoteMark, isActive && styles['quoteMark--active'])} name="quote-mark" width={39} height={25} fill="#B8B8B8" />
									<div
										className={cn(
											styles.slide,
											isActive && styles['slide--active']
										)}
									>
										<div>
											<Avatar>
												<AvatarImage
													src={review.avatarUrl}
													alt={`review by ${review.username}`}
												/>
												<AvatarFallback>{review.username}</AvatarFallback>
											</Avatar>
											<Text size={'base'} weight={700}>
												{review.username}
											</Text>
										</div>
										<Text size="sm" weight={400} className="mb-6">
											{review.text}
										</Text>

										<Rating value={review.rating} />
									</div>
								</>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}
