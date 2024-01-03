import * as tmImage from '@teachablemachine/image';
import { isLoading, isPlay, worker } from './store';

const modelURL: string = import.meta.env.VITE_MODEL_URL;
const metadataURL: string = import.meta.env.VITE_METADATA_URL;
const flip = true; // whether to flip the webcam

export let model: tmImage.CustomMobileNet, webcam: tmImage.Webcam, maxPredictions: number;

export async function init() {
	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();
	webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
}

export async function start({
	videoHTML,
	webcamHTML
}: {
	videoHTML: HTMLVideoElement;
	webcamHTML: HTMLDivElement;
}) {
	isPlay.set(true);
	isLoading.set(true);

	await webcam.setup(); // request access to the webcam
	await webcam.play();

	videoHTML.srcObject = webcam.canvas.captureStream();
	videoHTML.play();
	window.requestAnimationFrame(loop);
	webcamHTML.appendChild(webcam.canvas);
	isLoading.set(false);
	// worker?.postMessage({ time: inputValue });
}

export async function predict() {
	const prediction: { className: string; probability: number }[] = await model.predict(
		webcam.canvas
	);
	let tag: string = prediction[0].className;
	let prob: number = Number(prediction[0].probability.toFixed(2));
	worker.subscribe((worker) => {
		if (tag == 'sleep' && prob >= 0.6) {
			worker.postMessage({ status: 'sleep' });
		} else if (tag == 'sleep' && prob < 0.6) {
			worker.postMessage({ status: 'study' });
		}
	});
}
export async function loop() {
	if (webcam) {
		webcam.update(); // update the webcam frame
		await predict();
		window.requestAnimationFrame(loop);
	}
}

export function pause() {
	webcam.pause();
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture();
	}
	document.getElementById('webcam')?.removeChild(webcam.canvas);
	isPlay.set(false);
}

export async function clickPip(videoHTML: HTMLVideoElement) {
	if (!document.pictureInPictureElement) {
		await (videoHTML as HTMLVideoElement).requestPictureInPicture();
	} else {
		document.exitPictureInPicture();
	}
}
