'use client'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	FormField,
	FormItem
} from '@/components/ui'
import { UpdateProfileInput } from '@/features/profile'
import { Control } from 'react-hook-form'

import { selectAuthUser } from '@/features/auth'
import { useAppSelector } from '@/store'
import { ElementRef, useRef } from 'react'
import styles from './AvatarInput.module.scss'

interface IAvatarInputProps {
	control: Control<UpdateProfileInput>
	disabled?: boolean
}

export const AvatarInput = ({ control, disabled }: IAvatarInputProps) => {
	const user = useAppSelector(selectAuthUser)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const handleClick = () => {
		inputRef.current?.click()
	}
	return (
		<FormField
			control={control}
			name="avatar"
			render={({ field }) => (
				<FormItem headless className={styles.wrapper}>
					<Avatar className={styles.avatar}>
						<AvatarImage
							src={
								field.value instanceof File
									? URL.createObjectURL(field.value)
									: user?.avatar?.url
							}
							alt={user?.username}
						/>
						<AvatarFallback>{user?.username[0]}</AvatarFallback>
						<input
							className={styles.input}
							type="file"
							onChange={(e) => {
								const file = e.currentTarget.files?.[0]
								return file && field.onChange(file)
							}}
							ref={inputRef}
							multiple={false}
							accept="image/*"
							name={field.name}
							
							disabled={disabled}
						/>
					</Avatar>
					<button onClick={handleClick}  type="button" disabled={disabled}>
						Change
					</button>
				</FormItem>
			)}
		/>
	)
}
