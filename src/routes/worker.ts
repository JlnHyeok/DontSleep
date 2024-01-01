let timer: NodeJS.Timeout | undefined = undefined;
let time = 5 * 1000;

self.onmessage = (e) => {
	if (e.data.time) time = e.data.time * 1000;
	if (e.data.msg == 'start') {
		if (!timer) {
			timer = setTimeout(() => {
				postMessage({ status: '졸음 감지!' });
			}, time);
		}
	} else {
		clearTimeout(timer);
		postMessage({ status: '감시하는 중' });
		timer = undefined;
	}
};

function startTimer() {
	timer = setTimeout(() => {
		postMessage({ status: '졸음 감지!' });
	}, time);
}
