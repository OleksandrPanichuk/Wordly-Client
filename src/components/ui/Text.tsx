import { cva, VariantProps } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

const TextVariants = cva('', {
	variants: {
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			base: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl',
			'2xl': 'text-2xl'
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

interface ITextProps
	extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
		VariantProps<typeof TextVariants> {
	as?: keyof HTMLElementTagNameMap
}

export const Text = ({
	className,
	size,
	color,
	as: child,
	weight,
	...props
}: ITextProps) => {
	const fullClassName = TextVariants({ className, size, color, weight })

	const Comp = child ?? 'p'

	return <Comp {...props} className={fullClassName} />
}
