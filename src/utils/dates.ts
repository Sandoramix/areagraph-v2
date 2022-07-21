export function addDays(date: Date, days: number) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}
export function formatDate(date: Date | null, showHours: boolean = false) {
	if (!date) return ""
	const addPad = (s: string | number) => s.toString().padStart(2, '0')
	return `${date.toISOString().slice(0, 10)}${showHours ? ` ${addPad(date.getHours())}:${addPad(date.getMinutes())}` : ""}`;
}

export function fixDate(date: Date) {
	if (!date) return null
	return new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))
}