import * as React from 'react'

import { cva, VariantProps } from 'class-variance-authority'

export const inputVariants = cva('', {
	variants: {
		variant: {
			primary:
				'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-destructive data-[invalid=true]:focus-visible:ring-destructive',
			secondary:
				'border-0 placeholder:text-muted-foreground focus:outline-tw-purple-500 focus:outline-[1.5px] placeholder:text-sm hover:bg-tw-blue-100 bg-tw-blue-75 rounded-3xl px-4 py-3 w-full text-tw-black data-[invalid=true]:outline-destructive data-[invalid=true]:outline-[1.5px] data-[invalid=true]:outline'
		}
	},
	defaultVariants: {
		variant: 'primary'
	}
})

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={inputVariants({ variant, className })}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'

export { Input }
