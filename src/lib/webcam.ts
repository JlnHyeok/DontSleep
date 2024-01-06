import * as tmImage from '@teachablemachine/image';
import { isLoading, isPlay, timerForStudy } from '$lib/store';
import { sendMessage } from '$lib/thread';

const modelURL: string = import.meta.env.VITE_MODEL_URL;
const metadataURL: string = import.meta.env.VITE_METADATA_URL;
const flip = true; // whether to flip the webcam
let webcamStatus: 'play' | 'stop';

export let model: tmImage.CustomMobileNet, webcam: tmImage.Webcam, maxPredictions: number;

export async function init() {
	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();
}

export async function start({
	videoHTML,
	webcamHTML,
	inputValue
}: {
	videoHTML: HTMLVideoElement;
	webcamHTML: HTMLDivElement;
	inputValue: number;
}) {
	isPlay.set('play');
	isLoading.set(true);
	webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip

	await webcam.setup(); // request access to the webcam
	await webcam.play();

	videoHTML.srcObject = webcam.canvas.captureStream();
	videoHTML.play();
	window.requestAnimationFrame(loop);
	webcamHTML.appendChild(webcam.canvas);
	isLoading.set(false);
	toggleAnimation('play');
	sendMessage({ time: inputValue });
}

export async function predict() {
	const prediction: { className: string; probability: number }[] = await model.predict(
		webcam.canvas
	);
	let tag: string = prediction[0].className;
	let prob: number = Number(prediction[0].probability.toFixed(2));

	if (tag == 'sleep' && prob >= 0.6) {
		sendMessage({ status: 'sleep' });
	} else if (tag == 'sleep' && prob < 0.6) {
		sendMessage({ status: 'study' });
	}
}

export async function loop() {
	if (webcam.canvas) {
		webcam.update(); // update the webcam frame
		await predict();
		window.requestAnimationFrame(loop);
	}
}

export function pause() {
	toggleAnimation('pause');
	isPlay.set('pause');
	stopAction();
}

export function stop() {
	toggleAnimation('stop');
	isPlay.set('stop');

	if (webcamStatus == 'stop') return;

	stopAction();
}

export async function clickPip(videoHTML: HTMLVideoElement) {
	if (!document.pictureInPictureElement) {
		await (videoHTML as HTMLVideoElement).requestPictureInPicture();
	} else {
		document.exitPictureInPicture();
	}
}

function stopAction() {
	webcam.stop();
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture();
	}
	document.getElementById('webcam')?.removeChild(webcam.canvas);
	timerForStudy.subscribe((timer) => {
		clearTimeout(timer);
	});
	webcamStatus = 'stop';
}

function toggleAnimation(isPlay: 'play' | 'stop' | 'pause') {
	const runHTML: HTMLElement = document.getElementById('run')!;
	const motionHTML: HTMLElement = document.getElementById('motion')!;
	const fillHTML: HTMLElement = document.getElementById('fill')!;

	if (isPlay == 'play') {
		runHTML.classList.remove('![animation-play-state:paused]');
		motionHTML.classList.remove('![animation-play-state:paused]');
		fillHTML.classList.remove('![animation-play-state:paused]');
	} else {
		if (isPlay == 'stop') {
			resetAnimation(runHTML, 'run');
			resetAnimation(fillHTML, 'fill');
		}
		runHTML.classList.add('![animation-play-state:paused]');
		motionHTML.classList.add('![animation-play-state:paused]');
		fillHTML.classList.add('![animation-play-state:paused]');
	}
}

function resetAnimation(element: HTMLElement, className: string) {
	element.classList.remove(className);
	void element.offsetWidth;
	element.classList.add(className);
}
