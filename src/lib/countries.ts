import countries from '@/data/countries.json'
import { TypeCountryCode } from '@/types'

export function getCountryNames() {
	return countries.map((country) => country.name)
}

export function getCountryName(code: TypeCountryCode): string | undefined {
	return countries.find((country) => country.code === code)?.name
}

export function getCountryCode(name: string): string | undefined {
	return countries.find((country) => country.name === name)?.code
}
