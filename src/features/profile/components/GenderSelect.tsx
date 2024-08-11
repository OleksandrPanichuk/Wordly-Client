'use client'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui'
import { UpdateProfileInput } from '@/features/profile'
import { Gender } from '@/types'
import { Control } from 'react-hook-form'

interface IGenderSelectProps {
	control: Control<UpdateProfileInput>
	disabled?: boolean
}

export const GenderSelect = ({ control, disabled }: IGenderSelectProps) => {
	return (
		<FormField
			control={control}
			name="gender"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Gender</FormLabel>
					<Select {...field} disabled={disabled} value={field.value} onValueChange={field.onChange}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="Select your gender" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectItem value={Gender.FEMALE}>Female</SelectItem>
							<SelectItem value={Gender.MALE}>Male</SelectItem>
							<SelectItem value={Gender.OTHER}>Other</SelectItem>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
