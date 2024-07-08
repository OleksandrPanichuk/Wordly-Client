import { ReactNode } from "react"

export type TypePlan = {
	planId: number
	title: string
	isPopular?: boolean
	isBestOffer?: boolean
	discount?: number

	features: {
		icon: ReactNode 
		text: string
	}[]
}