import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-300',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				primary:
					'text-white rounded-[1.5rem] bg-tw-blue-400 hover:bg-tw-purple ',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
			font: {
				xs: 'text-xs',
				sm: 'text-sm',
				base: 'text-base',
				lg: 'text-lg',
				xl: 'text-xl',
			},
			weight: {
				400: 'font-normal',
				500: 'font-medium',
				600: 'font-semibold',
				700: 'font-bold',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			weight: 500,
			font: 'sm',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			weight,
			font,
			asChild = false,
			loading,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'

		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, weight, font, className })
				)}
				ref={ref}
				{...props}
			>
				{loading ? <Loader2 className='animate-spin ' /> : props.children}
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
