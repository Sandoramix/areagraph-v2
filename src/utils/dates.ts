export function addDays(date: Date, days: number) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}
export function formatDate(date: Date | null) {
	if (!date) return ""
	return date.toISOString().slice(0, 10);
}
export function fixDate(date: Date) {
	if (!date) return null
	return new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))
}