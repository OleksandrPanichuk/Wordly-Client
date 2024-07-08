import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface ITextBoxProps extends HTMLAttributes<HTMLDivElement> {
	color: 'purple' | 'red' | 'lightblue'
	imgClassName?: string
	textClassName?: string
}

export const TextBox = ({
	color,
	children,
	imgClassName,
	textClassName,
	...props
}: ITextBoxProps) => {
	return (
		<div {...props}>
			<img
				src={`/svgs/box-${color}.svg`}
				alt="badge"
				className={imgClassName}
			/>
			<p className={textClassName}>{children}</p>
		</div>
	)
}
