'use client'

import { forwardRef, useState } from 'react'
import Dropzone, { DropzoneRef } from 'react-dropzone'
import { FormControl } from '@/components/ui/Form'
import { cn } from '@/lib'

interface IImageDropzoneProps {
	disabled?: boolean
	value?: File
	onChange?: (value: File) => void
	name?: string
	isForm?: boolean
}

const ImageMimeTypes = ['.jpg', '.jfif', '.webp', '.png', '.jpeg']

export const ImageDropzone = forwardRef<DropzoneRef, IImageDropzoneProps>(
	({ onChange, value, name, disabled, isForm }, ref) => {
		const [file, setFile] = useState(value)
		const handleDrop = (files: File[]) => {
			const file = files[0]

			setFile(file)
			onChange?.(file)
		}
		return (
			<Dropzone
				maxFiles={1}
				multiple={false}
				maxSize={10 * 1024 * 1024}
				accept={{
					'image/*': ImageMimeTypes
				}}
				onDrop={handleDrop}
				disabled={disabled}
				ref={ref}
			>
				{({ getRootProps, getInputProps }) => (
					<div
						{...getRootProps()}
						className={cn(
							file
								? 'relative max-h-[300px]'
								: ' border-dashed border-zinc-400 border-2 bg-zinc-100 p-4 flex items-center justify-center text-zinc-600 h-[100px]'
						)}
					>
						{isForm ? (
							<FormControl>
								<input {...getInputProps()} name={name} />
							</FormControl>
						) : (
							<input {...getInputProps()} name={name} />
						)}
						{file ? (
							<img
								src={URL.createObjectURL(file)}
								alt={'preview'}
								className={'w-full object-contain'}
							/>
						) : (
							<p>
								Drag &apos;n&apos; drop some files here, or click to select
								files
							</p>
						)}
					</div>
				)}
			</Dropzone>
		)
	}
)

ImageDropzone.displayName = 'ImageDropzone'
