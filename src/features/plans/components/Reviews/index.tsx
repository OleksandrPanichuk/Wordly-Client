'use client'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Rating,
	Title
} from '@/components/ui'
import { Swiper, SwiperSlide } from 'swiper/react'

import { swiperSettings } from './Reviews.config'
import { reviews } from './Reviews.data'
import styles from './Reviews.module.scss'

export const Reviews = () => {
	return (
		<div className={styles.wrapper}>
			<div className="page__container">
				<Title size="2xl" as="h3">
					What our customers say
				</Title>
				<Swiper {...swiperSettings}>
					{reviews.map((review) => (
						<SwiperSlide className={styles.slide} key={review.id}>
							{({}) => (
								<>
									<div>
										<Avatar>
											<AvatarImage
												src={review.avatarUrl}
												alt={`review by ${review.username}`}
											/>
											<AvatarFallback>{review.username}</AvatarFallback>
										</Avatar>
										<p>{review.username}</p>
									</div>
									<p>{review.text}</p>

									<Rating value={review.rating} />
								</>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}
