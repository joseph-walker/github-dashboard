export function evaluateCSSVariable(variableName: string) {
	return getComputedStyle(document.documentElement)
		.getPropertyValue(variableName)
		.trim();
}
