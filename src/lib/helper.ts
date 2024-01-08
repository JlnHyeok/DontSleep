export function msToHMS(ms: number) {
	// 1- Convert to seconds:
	let seconds: number | string = ms / 1000;
	// 2- Extract hours:
	const hours = Math.floor(seconds / 3600); // 3,600 seconds in 1 hour
	seconds = seconds % 3600; // seconds remaining after extracting hours
	// 3- Extract minutes:
	const minutes = addZero(Math.floor(seconds / 60)); // 60 seconds in 1 minute
	// 4- Keep only seconds not extracted to minutes:
	seconds = addZero(Math.ceil(seconds % 60));

	return `${hours}h ${minutes}m ${seconds}s`;
}

function addZero(num: number) {
	if (num < 10) return `0${num}`;
	return num;
}
