"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { type UpdateProfileInput, updateProfileSchema, useUpdateProfile } from "@/features/profile"
import { Form } from "@/components/ui"

export const ProfileForm = () => {
	const form = useForm<UpdateProfileInput>({
		resolver: zodResolver(updateProfileSchema),
		mode:'onBlur'
	})

	const {handleSubmit, control} = form

	const {mutate: updateProfile} = useUpdateProfile()

	const onSubmit = (values: UpdateProfileInput)=> updateProfile(values)


	return <Form {...form}>
		<form onSubmit={handleSubmit(onSubmit)}>
			
		</form>
	</Form>
}