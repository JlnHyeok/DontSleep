import * as tmImage from '@teachablemachine/image';
import { worker } from './store';

const modelURL: string = import.meta.env.VITE_MODEL_URL;
const metadataURL: string = import.meta.env.VITE_METADATA_URL;

export let model: tmImage.CustomMobileNet, webcam: tmImage.Webcam, maxPredictions: number;

export async function init() {
	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();

	const flip = true; // whether to flip the webcam
	webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
	await webcam.setup(); // request access to the webcam
}

export async function start(worker: Worker) {
	await webcam.play();
	const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement;
	video.srcObject = webcam.canvas.captureStream();
	video.play();
	window.requestAnimationFrame(() => loop(worker));
	document.getElementById('webcam')?.appendChild(webcam.canvas);
	// worker?.postMessage({ time: inputValue });
}

export async function predict() {
	const prediction: { className: string; probability: number }[] = await model.predict(
		webcam.canvas
	);
	for (let i = 0; i < maxPredictions; i++) {
		let tag: string = prediction[i].className;
		let prob: number = Number(prediction[i].probability.toFixed(2));

		worker.subscribe((worker) => {
			if (tag == 'sleep' && prob >= 0.6) {
				worker.postMessage({ status: 'sleep' });
			} else if (tag == 'sleep' && prob < 0.6) {
				worker.postMessage({ status: 'study' });
			}
		});
	}
}
export async function loop(worker: Worker) {
	if (webcam) {
		webcam.update(); // update the webcam frame
		await predict();
		window.requestAnimationFrame(() => loop(worker));
	}
}

export function stop(isPlay: boolean) {
	if (isPlay) {
		webcam.stop();
		if (document.pictureInPictureElement) {
			document.exitPictureInPicture();
		}
		document.getElementById('webcam')?.removeChild(webcam.canvas);
		isPlay = false;
	}
}

export async function clickPip() {
	if (!document.pictureInPictureElement) {
		const video = document.getElementById('video');
		await (video as HTMLVideoElement).requestPictureInPicture();
	} else {
		document.exitPictureInPicture();
	}
}
