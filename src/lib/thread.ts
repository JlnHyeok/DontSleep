import { worker } from '$lib/store';

export function sendMessage(message: any) {
	worker.subscribe((worker) => {
		worker.postMessage(message);
	});
}
