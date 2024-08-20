import { SvgIcon, SvgIconProps } from '@/components/common'
import { cva, VariantProps } from 'class-variance-authority'
import { icons, LucideProps } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

export const iconButtonVariants = cva('transition-all duration-300 cursor-pointer', {
	variants: {
		variant: {
			gray: 'text-tw-black bg-tw-gray-50 hover:bg-tw-gray-75',
			blue: '',
			ghost: 'hover:bg-accent hover:text-accent-foreground'
		},
		size: {
			base: 'p-2.5 rounded-xl',
			sm: 'p-2 rounded-md'
		}
	},
	defaultVariants: {
		variant: 'gray',
		size: 'base'
	}
})

type TypeIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof iconButtonVariants> &
	(
		| { lname: keyof typeof icons; iconProps?: LucideProps }
		| { sname: string; iconProps?: Omit<SvgIconProps, 'name'> }
	)

export const IconButton = ({
	className,
	variant,
	size,
	...props
}: TypeIconButtonProps) => {
	return (
		<button className={iconButtonVariants({ className, variant, size })} {...props}>
			{'lname' in props ? (
				(() => {
					const LucideIcon = icons[props.lname]
					return <LucideIcon {...props?.iconProps} />
				})()
			) : (
				<SvgIcon name={props.sname} {...props?.iconProps} />
			)}
		</button>
	)
}
