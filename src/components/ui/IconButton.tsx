import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'
import { icons, LucideProps } from 'lucide-react'
import { SvgIcon, SvgIconProps } from '@/components/common'

const iconButtonVariants = cva('transition-all duration-300 cursor-pointer', {
	variants: {
		colorScheme: {
			gray: 'text-tw-black bg-tw-gray-50 hover:bg-tw-gray-75',
			blue: ''
		},
		size: {
			base: 'p-2.5 rounded-xl'
		}
	},
	defaultVariants: {
		colorScheme: 'gray',
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
	colorScheme,
	size,
	...props
}: TypeIconButtonProps) => {
	return (
		<button className={iconButtonVariants({ className, colorScheme, size })}>
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
