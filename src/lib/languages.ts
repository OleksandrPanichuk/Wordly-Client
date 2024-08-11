import languages from '@/data/languages.json'

export function getLanguages() {
	return languages
}

export function getLanguageCode(name: string): string | undefined {
	return languages.find((language) => language.name === name)?.code
}
export function getLanguageName(code: string): string | undefined {
	return languages.find((language) => language.code === code)?.name
}

