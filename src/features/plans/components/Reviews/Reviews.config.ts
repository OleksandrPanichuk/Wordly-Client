import { Navigation, Pagination } from "swiper/modules"
import { SwiperProps } from "swiper/react"

import styles from './Reviews.module.scss'

export const swiperSettings: SwiperProps = {
	slidesPerView: 3,
	centeredSlides: true,
	modules: [Pagination, Navigation],
	navigation: {
		nextEl: styles.next,
		prevEl: styles.prev
	},
	pagination: {
		bulletActiveClass: styles['dot--active'],
		bulletClass: styles.dot,
		clickable: true,
		dynamicBullets: true
	}
}