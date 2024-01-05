import { worker } from './store';

export function sendMessage(message: any) {
	worker.subscribe((worker) => {
		worker.postMessage(message);
	});
}
