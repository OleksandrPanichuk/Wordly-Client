import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

const titleVariants = cva('', {
	variants: {
		variant: {
			h1: ' text-[2rem] md:text-[2.8rem]   font-bold',
			h2: '',
			h3: '',
			h4: '',
			h5: '',
			h6: '',
		},
		color: {
			blue: 'text-tw-blue-500',
		},
	},
	defaultVariants: {
		variant: 'h3',
		color: 'blue',
	},
})

interface ITitleProps
	extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
		VariantProps<typeof titleVariants> {}

export const Title = ({ className, variant, color, ...props }: ITitleProps) => {
	const fullClassName = titleVariants({ className, variant, color })

	const Comp = variant! 

	return <Comp {...props} className={fullClassName} />
}
