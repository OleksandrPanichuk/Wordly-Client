"use client"
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

const titleVariants = cva('', {
	variants: {
		variant: {
			h1: ' text-[2rem] md:text-[2.8rem] ',
			h2: ' text-4xl md:text-[2.5rem] ',
			h3: '',
			h4: '',
			h5: '',
			h6: '',
		},
		size: {
			default: '',
			'6xl': 'text-5xl md:text-6xl',
			"5xl":"text-4xl md:text-5xl",
			'3xl': 'text-2xl md:text-3xl',
		},
		weight: {
			700: 'font-bold',
			600: 'font-semibold',
			500: 'font-medium',
			400: 'font-normal',
		},
		color: {
			blue: 'text-tw-blue-500',
			primary: 'text-[#333333]',
		},
	},
	defaultVariants: {
		variant: 'h3',
		size: 'default',
		weight: 700,
	},
})

interface ITitleProps
	extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
		VariantProps<typeof titleVariants> {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Title = ({
	className,
	variant,
	color,
	size,
	weight,
	as: asComp,
	...props
}: ITitleProps) => {
	const fullClassName = {
		weight,
		color,
		className,
	} as VariantProps<typeof titleVariants>

	if (!!size) {
		fullClassName.size = size
	} else {
		fullClassName.variant = variant
	}

	const Comp = asComp ?? variant!

	return <Comp {...props} className={titleVariants(fullClassName)} />
}
