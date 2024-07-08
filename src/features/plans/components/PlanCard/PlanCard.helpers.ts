export function getPriceWithoutDiscount(
	price: number | null,
	discount: number | undefined,
	isPending: boolean
) {
	if (discount && price && !isPending) {
		return Math.ceil((price * (100 + discount)) / 100) - 0.01
	}
	return null
}

export function getFormattedPrice(price?: number) {
	if (price) {
		return price / 100
	}
	return null
}
