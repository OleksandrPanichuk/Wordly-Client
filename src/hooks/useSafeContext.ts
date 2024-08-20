"use client"

import { Context, useContext } from 'react'

export const useSafeContext = <T>(context:Context<T>) => {
	const data = useContext(context);

	if (!data) {
      throw new Error("useSafeContext must be used within context");
  }

	return data
}