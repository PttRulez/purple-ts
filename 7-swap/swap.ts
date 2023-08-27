function swapKeysAndValues(obj: Record<string, number>): Record<number, string> {
	const result: Record<number, string> = {}
	for (const [key, value] of Object.entries(obj)) {
		result[value] = key
	}

	return result
}

