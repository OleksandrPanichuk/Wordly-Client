export function formatOrderNumber(num: number) {
	if (num <= 9) {
		return `0${num}`
	}
	return `${num}`
}
