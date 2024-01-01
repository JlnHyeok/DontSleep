<script lang="ts">
	import * as tmImage from '@teachablemachine/image';
	import { onMount } from 'svelte';

	let worker: Worker | undefined = undefined;
	let status: string = '대기';
	let isPlay: boolean = false;
	const URL = `/model/`;
	let model: tmImage.CustomMobileNet,
		webcam: tmImage.Webcam,
		labelContainer: HTMLElement | null,
		maxPredictions: number;

	let snd: HTMLAudioElement;
	let isLoading: boolean = false;
	let isPip: boolean = false;
	let inputValue: number = 0;
	const modelURL = URL + 'model.json';
	const metadataURL = URL + 'metadata.json';

	onMount(async () => {
		snd = new Audio('/alarm/alarm1.mp3');
		loadWorker();
		model = await tmImage.load(modelURL, metadataURL);
		maxPredictions = model.getTotalClasses();
		document.addEventListener('enterpictureinpicture', () => {
			isPip = true;
		});
		document.addEventListener('leavepictureinpicture', () => {
			isPip = false;
		});
	});

	async function init() {
		if (!isPlay) {
			isLoading = true;
			isPlay = true;
			const flip = true; // whether to flip the webcam
			webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
			await webcam.setup(); // request access to the webcam
			await webcam.play();
			isLoading = false;
			const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement;
			video.srcObject = webcam.canvas.captureStream();
			video.play();
			window.requestAnimationFrame(loop);
			document.getElementById('webcam')?.appendChild(webcam.canvas);
			worker?.postMessage({ time: inputValue });
		}
	}

	function stop() {
		if (isPlay) {
			webcam.stop();
			if (document.pictureInPictureElement) {
				document.exitPictureInPicture();
			}
			document.getElementById('webcam')?.removeChild(webcam.canvas);
			isPlay = false;
		}
	}

	async function clickPip() {
		if (!document.pictureInPictureElement) {
			const video = document.getElementById('video');
			await (video as HTMLVideoElement).requestPictureInPicture();
		} else {
			document.exitPictureInPicture();
		}
	}

	async function loop() {
		if (webcam) {
			webcam.update(); // update the webcam frame
			await predict();
			window.requestAnimationFrame(loop);
		}
	}

	function beep() {
		if (status == '졸음 감지!') {
			snd.play();
		} else {
			snd.pause();
			snd.currentTime = 0;
		}
	}
	// run the webcam image through the image model
	async function predict() {
		beep();
		// predict can take in an image, video or canvas html element
		if (webcam.canvas) {
			const prediction = await model.predict(webcam.canvas);
			for (let i = 0; i < maxPredictions; i++) {
				if (i == 0 && Number(prediction[0].probability.toFixed(2)) >= 0.6) {
					worker?.postMessage({ msg: 'start' });
				} else if (i == 0 && Number(prediction[0].probability.toFixed(2)) < 0.6) {
					worker?.postMessage({ msg: 'end' });
				}
			}
		}
	}

	const loadWorker = async () => {
		const Worker = await import('./worker?worker');
		worker = new Worker.default();
		worker.postMessage('ss');
		worker.onmessage = (e) => {
			status = e.data.status;
		};
	};
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="z-10 w-[400px] h-2/3">
	<!-- TITLE -->
	<div class="w-full flex justify-center mb-10">
		<span class="font-extrabold text-[36px]"> 나만의 온라인 스터디룸 </span>
	</div>

	<!-- VIDEO (HIDDEN) -->
	<video id="video" src="" />

	<!-- WEBCAM DISPLAY WRAP -->
	<div
		class="m-auto relative h-[300px] w-[300px] rounded-[10px] overflow-hidden bg-gray-200 border-4 border-black flex justify-center items-center
		{status == '졸음 감지!' && 'animate-shake'} "
	>
		<!-- PIP BTN -->
		<button
			id="pip"
			class="absolute z-30 top-1 right-2 font-bold rounded-lg duration-500 opacity-100
						{isPlay ? `hover:scale-[1.04]` : `!opacity-0`}"
			on:click={clickPip}
			disabled={isPlay ? false : true}
		>
			<img src="/icon/pip.svg" alt="pip" width={30} />
		</button>

		<!-- LOADING SPINNER -->
		{#if isLoading}
			<div
				class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
			/>
		{/if}

		<!-- WEBCAM -->
		{#if isPlay}
			<!-- content here -->
			<div id="webcam"></div>
			{#if isPip}
				<div class="w-full absolute h-full bg-gray-500"></div>
			{/if}
		{:else}
			<div>
				<img width={100} src="/icon/frame-person.svg" alt="frame" />
			</div>
		{/if}
	</div>

	<div class="m-auto w-[300px] h-14 flex justify-center items-center bg-red-200">
		시간 설정 공간
		<input type="number" required bind:value={inputValue} step={10} min={0} max={60} />
	</div>
	<!-- START / STOP BTN -->
	<div class="w-full flex justify-center">
		<button
			type="button"
			class="border-black text-xl font-bold border-2 w-[300px] h-10 rounded-lg bg-blue-300 hover:scale-[1.02] duration-100"
			on:click={!isPlay ? init : stop}>{!isPlay ? 'Start' : 'Stop'}</button
		>
	</div>

	{#if isPlay}
		<!-- content here -->
		<div class="w-full justify-center animate-pulse flex mt-5">
			<span
				class="font-extrabold text-3xl
			 {status == '감시하는 중' ? 'text-green-600' : 'text-red-600'}"
				>{status == '감시하는 중' ? '오늘도 화이팅!' : '졸면 안돼요!!!'}</span
			>
		</div>
	{/if}
</div>

<style>
	#video {
		display: none;
		width: 100px;
		height: 50px;
		overflow: hidden;
		-webkit-transform: scaleX(-1);
		transform: scaleX(-1);
	}
</style>
