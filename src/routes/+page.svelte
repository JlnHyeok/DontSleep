<script lang="ts">
	import AlarmModal from '../components/modal/AlarmModal.svelte';
	import Timer from 'timer.js';
	import ProgressBar from '$components/ProgressBar.svelte';
	import { beep } from '$lib/sound';
	import {
		isLoading,
		isPip,
		isPlay,
		progressTime,
		studyTargetTime,
		timerForStudy,
		worker
	} from '$lib/store';
	import { init, start, stop, clickPip, pause } from '$lib/webcam';
	import { onMount } from 'svelte';
	import { msToHMS } from '$lib/helper';

	let videoHTML: HTMLVideoElement;
	let webcamHTML: HTMLDivElement;
	let hour: number = 1;
	let min: number = 0;
	let sec: number = 0;
	let showAlarmStopModal: boolean = false;

	$timerForStudy = new Timer({
		tick: 1,
		ontick: function (ms: number) {
			$progressTime = msToHMS(ms);
		},
		onend: function () {
			$progressTime = '0h 00m 00s';
		},
		onstop: function () {
			$progressTime = '0h 00m 00s';
		}
	});

	let status: string = '대기';

	onMount(async () => {
		videoHTML = document.getElementById('video') as HTMLVideoElement;
		webcamHTML = document.getElementById('webcam') as HTMLDivElement;

		await loadWorker();
		await init();
	});

	//#region Function
	const loadWorker = async () => {
		const Worker = await import('$lib/worker?worker');
		$worker = new Worker.default();
		$worker.onmessage = (e) => {
			status = e.data.status;
			if (status == 'sleep' && showAlarmStopModal == false) {
				showAlarmStopModal = true;
				beep(status);
				window.navigator.vibrate(10000);
			}
		};
	};

	function startTimer() {
		if ($isPlay == 'stop') {
			$studyTargetTime = hour * 3600 + min * 60 + sec;
			if ($studyTargetTime < 10 || $studyTargetTime > 3 * 60 * 60) return;
			$timerForStudy.start($studyTargetTime);
		} else if ($isPlay == 'pause') {
			$timerForStudy.start();
		}
		start({ videoHTML, webcamHTML, inputValue: 5 });
	}

	function pauseTimer() {
		pause();
		$timerForStudy.pause();
	}

	function stopTimer() {
		stop();
		$timerForStudy.stop();
	}
	//#endregion
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="z-10 w-[350px] h-3/4 mt-14 relative">
	<!-- VIDEO (HIDDEN) -->
	<video id="video" src="" />

	<!-- WEBCAM DISPLAY WRAP -->
	<div
		class="m-auto relative h-[300px] w-[300px] rounded-[10px] overflow-hidden bg-gray-200 border-4 border-black flex justify-center items-center
		{showAlarmStopModal && 'animate-shake'} "
	>
		<!-- PIP BTN -->
		<button
			id="pip"
			class="absolute z-30 top-1 right-2 font-bold rounded-lg duration-500 opacity-100
						{$isPlay == 'play' && !$isLoading ? `hover:scale-[1.04]` : `!opacity-0`}"
			on:click={() => clickPip(videoHTML)}
			disabled={$isPlay == 'play' && !$isLoading ? false : true}
		>
			<img src="/icon/pip.svg" alt="pip" width={30} />
		</button>

		<!-- LOADING SPINNER -->
		{#if $isLoading}
			<div
				class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
			/>
		{/if}

		<!-- WEBCAM -->
		<div id="webcam"></div>
		{#if $isPlay == 'play'}
			{#if $isPip}
				<div class="w-full absolute h-full bg-gray-500"></div>
			{/if}
		{:else}
			<div>
				<img width={100} src="/icon/frame-person.svg" alt="frame" />
			</div>
		{/if}
	</div>

	<!-- TIME SETTING SECTION -->
	<div class="m-auto w-[290px] h-14 flex justify-center items-center">
		<div class="relative w-[250px] h-full rounded-lg flex justify-center items-center">
			<div class="flex justify-between w-full">
				<label
					for="hour"
					class="flex w-[70px] rounded-md justify-center items-center gap-[6px] duration-300
					{$isPlay == 'stop' ? 'bg-gray-100' : 'bg-gray-200 opacity-70'}"
				>
					<input
						disabled={$isPlay == 'play' || $isPlay == 'pause'}
						type="number"
						name="hour"
						id="hour"
						class="w-10 h-8 text-center outline-none bg-inherit text-lg font-bold text-gray-600"
						bind:value={hour}
					/>
					<span class="flex text-sm mt-1 justify-center">h</span>
				</label>
				<label
					for="min"
					class="flex w-[70px] rounded-md justify-center items-center gap-[6px] duration-300
				{$isPlay == 'stop' ? 'bg-gray-100' : 'bg-gray-200 opacity-70'}"
				>
					<input
						disabled={$isPlay == 'play' || $isPlay == 'pause'}
						type="number"
						name="min"
						id="min"
						class="w-10 h-8 text-center rounded-md outline-none bg-inherit text-lg font-bold text-gray-600"
						bind:value={min}
					/>
					<span class="flex text-sm mt-1 justify-center">m</span>
				</label>
				<label
					for="sec"
					class="flex w-[70px] rounded-md justify-center items-center gap-[6px] duration-300
				{$isPlay == 'stop' ? 'bg-gray-100' : 'bg-gray-200 opacity-70'}"
				>
					<input
						disabled={$isPlay == 'play' || $isPlay == 'pause'}
						type="number"
						name="sec"
						id="sec"
						class="w-10 h-8 text-center rounded-md outline-none bg-inherit text-lg font-bold text-gray-600"
						bind:value={sec}
					/>
					<span class="flex text-sm mt-1 justify-center">s</span>
				</label>
			</div>
		</div>
	</div>

	<!-- START / STOP BTN -->
	<div class="w-[300px] m-auto mt-2 flex justify-center gap-10">
		{#if $isLoading || $isPlay !== 'play'}
			<!-- content here -->
			<button
				disabled={$isPlay == 'play'}
				class="border-black text-xl font-bold border-2 w-[125px] h-10 rounded-lg bg-blue-300 hover:scale-[1.02] hover:bg-blue-400 hover:text-gray-100 duration-300"
				on:click={startTimer}>START</button
			>
		{:else}
			<button
				disabled={$isPlay !== 'play'}
				class="border-black text-xl font-bold border-2 w-[125px] h-10 rounded-lg bg-green-300 hover:scale-[1.02] hover:bg-green-400 hover:text-gray-100 duration-300"
				on:click={pauseTimer}>PAUSE</button
			>
		{/if}

		<button
			disabled={$isLoading || $isPlay == 'stop'}
			class="border-black text-xl font-bold border-2 w-[125px] h-10 rounded-lg bg-red-300 hover:scale-[1.02] hover:bg-red-400 hover:text-gray-100 duration-300"
			on:click={stopTimer}>RESET</button
		>
	</div>

	<!-- content here -->
	<div class="w-full mt-10">
		<ProgressBar />
	</div>
</div>

<AlarmModal bind:showModal={showAlarmStopModal} />

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
