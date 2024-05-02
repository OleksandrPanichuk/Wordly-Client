'use client'
import { Text } from '@/components/ui'
import { Images } from '@/shared/constants'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Visibility } from '@/components/common'
import { Autoplay } from 'swiper/modules'

const data = [
	{
		url: Images.SIGN_IN_1,
		text: 'Ask questions and have them answered by language experts',
		id: 1,
	},
	{
		url: Images.SIGN_IN_2,
		text: 'Keep your learning data',
		id: 2,
	},
	{
		url: Images.SIGN_IN_3,
		text: 'Test your language proficiency',
		id: 3,
	},
] satisfies { url: string; text: string; id: number }[]

export const ImageSlider = () => {
	return (
		<Visibility  breakpoint='(min-width: 1024px)'>
			<div className='bg-tw-gray-100 flex-1 max-lg:hidden'>
				<Swiper
					modules={[Autoplay]}
					speed={1000}
					autoplay={{ delay: 3000 }}
					direction='vertical'
					className='overflow-hidden max-h-screen'
				>
					{data.map(item => (
						<SwiperSlide
							className='h-screen flex-none flex items-center justify-center gap-4 flex-col'
							key={item.id}
						>
							<Image alt='sign-in' src={item.url} width={375} height={375} />
							<Text
								color={'dark-gray'}
								size={'lg'}
								className='text-center px-2'
								weight={500}
							>
								{item.text}
							</Text>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</Visibility>
	)
}
