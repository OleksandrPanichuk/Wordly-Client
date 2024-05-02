const upperCaseRegex = /^[A-Z]$/
const lowerCaseRegex = /^[a-z]$/
const numberRegex = /^[0-9]$/
const symbolRegex = /^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/

const defaultOptions = {
	minLength: 8,
	minLowercase: 1,
	minUppercase: 1,
	minNumbers: 1,
	minSymbols: 1,
	returnScore: false,
	pointsPerUnique: 1,
	pointsPerRepeat: 0.5,
	pointsForContainingLower: 10,
	pointsForContainingUpper: 10,
	pointsForContainingNumber: 10,
	pointsForContainingSymbol: 10,
}

function countChars(str: string) {
	let result: Record<string, number> = {}
	Array.from(str).forEach(char => {
		let curVal = result[char]
		if (curVal) {
			result[char] += 1
		} else {
			result[char] = 1
		}
	})
	return result
}

type AnalysisType = {
	length: number
	uniqueChars: number
	uppercaseCount: number
	lowercaseCount: number
	numberCount: number
	symbolCount: number
}

/* Return information about a password */
function analyzePassword(password: string): AnalysisType {
	let charMap = countChars(password)
	let analysis: AnalysisType = {
		length: password.length,
		uniqueChars: Object.keys(charMap).length,
		uppercaseCount: 0,
		lowercaseCount: 0,
		numberCount: 0,
		symbolCount: 0,
	}
	Object.keys(charMap).forEach(char => {
		if (upperCaseRegex.test(char)) {
			analysis.uppercaseCount += charMap[char]
		} else if (lowerCaseRegex.test(char)) {
			analysis.lowercaseCount += charMap[char]
		} else if (numberRegex.test(char)) {
			analysis.numberCount += charMap[char]
		} else if (symbolRegex.test(char)) {
			analysis.symbolCount += charMap[char]
		}
	})
	return analysis
}

function scorePassword(analysis: AnalysisType) {
	const scoringOptions = defaultOptions
	let points = 0
	points += analysis.uniqueChars * scoringOptions.pointsPerUnique
	points +=
		(analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat
	if (analysis.lowercaseCount > 0) {
		points += scoringOptions.pointsForContainingLower
	}
	if (analysis.uppercaseCount > 0) {
		points += scoringOptions.pointsForContainingUpper
	}
	if (analysis.numberCount > 0) {
		points += scoringOptions.pointsForContainingNumber
	}
	if (analysis.symbolCount > 0) {
		points += scoringOptions.pointsForContainingSymbol
	}
	return points
}

export function isStrongPassword(str: string) {
	const options = defaultOptions
	const analysis = analyzePassword(str)

	if (options.returnScore) {
		return scorePassword(analysis)
	}
	return (
		analysis.length >= options.minLength &&
		analysis.lowercaseCount >= options.minLowercase &&
		analysis.uppercaseCount >= options.minUppercase &&
		analysis.numberCount >= options.minNumbers &&
		analysis.symbolCount >= options.minSymbols
	)
}
