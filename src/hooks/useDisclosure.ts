'use client'

import { useState } from 'react'

export const useDisclosure = (defaultOpen: boolean = false) => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

	const open = () => setIsOpen(true)
	const close = () => setIsOpen(false)
	const toggle = () => setIsOpen((prev) => !prev)

	return { isOpen, open, close, toggle } 
}
