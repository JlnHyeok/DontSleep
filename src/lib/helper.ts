import RunBird from '$components/avatar/RunBird.svelte';
import RunBrownDog from '$components/avatar/RunBrownDog.svelte';
import RunCat from '$components/avatar/RunCat.svelte';
import RunDoraemong from '$components/avatar/RunDoraemong.svelte';
import RunGirl from '$components/avatar/RunGirl.svelte';
import RunRabbit from '$components/avatar/RunRabbit.svelte';
import RunSlime from '$components/avatar/RunSlime.svelte';
import RunWhiteDog from '$components/avatar/RunWhiteDog.svelte';

export function parseStringToAvatar(name: string): typeof RunGirl {
	console.log(name);
	switch (name) {
		case 'RunGirl':
			return RunGirl;
		case 'RunCat':
			return RunCat;
		case 'RunRabbit':
			return RunRabbit;
		case 'RunSlime':
			return RunSlime;
		case 'RunDoraemong':
			return RunDoraemong;
		case 'RunBrownDog':
			return RunBrownDog;
		case 'RunWhiteDog':
			return RunWhiteDog;
		case 'RunBird':
			return RunBird;
		default:
			return RunSlime;
	}
}

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
