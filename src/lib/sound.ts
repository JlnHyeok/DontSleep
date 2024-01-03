let snd = new Audio('/alarm/alarm1.mp3');

export function beep() {
	if (status == '졸음 감지!') {
		snd.play();
	} else {
		snd.pause();
		snd.currentTime = 0;
	}
}
