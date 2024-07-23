import { cva, VariantProps } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ElementType } from 'react'

const textVariants = cva('', {
	variants: {
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			base: 'text-base',
			'base-sm': 'sm:text-base text-sm',
			lg: 'text-sm sm:text-base lg:text-lg',
			"lg-base":"sm:text-lg text-base",
			xl: 'text-xl',
			'2xl': 'text-2xl',
			"2xl-lg":"sm:text-2xl text-lg",
			"40px-2xl":"text-2xl sm:text-4xl lg:text-[40px]"
		},
		color: {
			gray: 'text-tw-gray-200',
			'light-gray': 'text-tw-gray-100',
			'dark-gray': 'text-tw-gray-500',
			black: 'text-tw-black',
			purple: 'text-tw-purple-400',
			'blue-450': 'text-tw-blue-450',

			'gray-500': 'text-tw-gray-500',
			'gray-400': 'text-tw-gray-400',
			'gray-200': 'text-tw-gray-200',
			'gray-100': 'text-tw-gray-100'
		},
		weight: {
			400: 'font-normal',
			500: 'font-medium',
			600: 'font-semibold',
			700: 'font-bold'
		}
	},
	defaultVariants: {
		weight: 400,
		size: 'base',
		color: 'gray'
	}
})

type TypeTextProps <T extends ElementType> = 
	 Omit<ComponentPropsWithoutRef<T>, 'color' | 'size' | 'weight'> &
		VariantProps<typeof textVariants>  &{
	as?: T
}

export function Text <T extends ElementType>({
	className,
	size,
	color,
	as: asComp,
	weight,
	...props
}: TypeTextProps<T>) {
	const fullClassName = textVariants({ className, size, color, weight })

	const Component = asComp ?? 'p'

	return <Component {...props} className={fullClassName} />
}
