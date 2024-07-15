import { Navigation, Pagination } from 'swiper/modules'
import { SwiperProps } from 'swiper/react'

export const swiperSettings: SwiperProps = {
	initialSlide: 1,
	slidesPerView: 1,
	spaceBetween: 0,
	breakpoints: {
		'640': {
			slidesPerView: 'auto',
			spaceBetween: 48
		},
		'1024': {
			slidesPerView: 3,
			spaceBetween: 32
		}
	},
	modules: [Navigation, Pagination],
	navigation: {
		enabled: true
	},
	pagination: {
		enabled: true,
		clickable: true,
		dynamicBullets: true
	},
	centeredSlides: true,
	autoHeight: true
}
