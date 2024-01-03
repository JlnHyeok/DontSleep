let timer: NodeJS.Timeout | undefined = undefined;
let time = 3 * 1000;

self.onmessage = (e) => {
	if (e.data.time) time = e.data.time * 1000;
	if (e.data.status == 'sleep') {
		if (!timer) {
			timer = setTimeout(() => {
				postMessage({ status: 'sleep' });
			}, time);
		}
	} else {
		clearTimeout(timer);
		postMessage({ status: 'monitoring' });
		timer = undefined;
	}
};
