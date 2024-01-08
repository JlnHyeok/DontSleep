<script lang="ts">
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
	import { init, start, stop, clickPip, pause, toggleAnimation } from '$lib/webcam';
	import { onMount } from 'svelte';
	import { msToHMS } from '$lib/helper';

	let videoHTML: HTMLVideoElement;
	let webcamHTML: HTMLDivElement;
	let hour: number = 1;
	let min: number = 0;
	let sec: number = 0;

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
			beep(status);
		};
	};

	function startTimer() {
		start({ videoHTML, webcamHTML, inputValue: 5 });
		$studyTargetTime = hour * 3600 + min * 60 + sec;
		console.log($studyTargetTime);
		$timerForStudy.start($studyTargetTime);
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
<div class="z-10 w-[400px] xs:h-3/4 h-[90%] relative">
	<!-- TITLE -->
	<div class="w-full flex justify-center mt-14 mb-2">
		<span class="font-extrabold text-[36px]"> 나만의 스터디룸 </span>
	</div>

	<!-- VIDEO (HIDDEN) -->
	<video id="video" src="" />

	<!-- WEBCAM DISPLAY WRAP -->
	<div
		class="m-auto relative h-[300px] w-[300px] rounded-[10px] overflow-hidden bg-gray-200 border-4 border-black flex justify-center items-center
		{status == 'sleep' && 'animate-shake'} "
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
		<div class="relative bg-purple-400 w-[250px] h-1/2 rounded-lg flex justify-center items-center">
			<div class="flex justify-center gap-2">
				<input
					disabled={$isPlay == 'play' || $isPlay == 'pause'}
					type="number"
					name="hour"
					id="hour"
					class="w-10"
					bind:value={hour}
				/>
				<label for="hour">시간</label>
				<input
					disabled={$isPlay == 'play' || $isPlay == 'pause'}
					type="number"
					name="min"
					id="min"
					class="w-10"
					bind:value={min}
				/>
				<label for="min">분</label>
				<input
					disabled={$isPlay == 'play' || $isPlay == 'pause'}
					type="number"
					name="sec"
					id="sec"
					class="w-10"
					bind:value={sec}
				/>
				<label for="sec">초</label>
			</div>
			<!-- <div class=""><img src="/img/clock.png" alt="clock" /></div> -->
		</div>
	</div>

	<!-- START / STOP BTN -->
	<div class="w-[300px] m-auto flex justify-center gap-10">
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
			on:click={stopTimer}>STOP</button
		>
	</div>

	<!-- content here -->
	<div class="w-full mt-10">
		<ProgressBar />
	</div>
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
