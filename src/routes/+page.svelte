<script lang="ts">
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { beep } from '$lib/sound';
	import { isLoading, isPip, isPlay, worker } from '$lib/store';
	import { init, start, stop, clickPip } from '$lib/webcam';
	import { onMount } from 'svelte';

	let videoHTML: HTMLVideoElement;
	let webcamHTML: HTMLDivElement;

	let status: string = '대기';
	let inputValue: number = 0;

	onMount(async () => {
		videoHTML = document.getElementById('video') as HTMLVideoElement;
		webcamHTML = document.getElementById('webcam') as HTMLDivElement;
		await loadWorker();
		await init();
	});

	const loadWorker = async () => {
		const Worker = await import('$lib/worker?worker');
		$worker = new Worker.default();
		$worker.onmessage = (e) => {
			status = e.data.status;
			beep(status);
		};
	};
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="z-10 w-[400px] xs:h-3/4 h-full relative">
	<!-- TITLE -->
	<div class="w-full flex justify-center mt-14 mb-2">
		<span class="font-extrabold text-[36px]"> 나만의 온라인 스터디룸 </span>
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
						{$isPlay ? `hover:scale-[1.04]` : `!opacity-0`}"
			on:click={() => clickPip(videoHTML)}
			disabled={$isPlay ? false : true}
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
		{#if $isPlay}
			{#if $isPip}
				<div class="w-full absolute h-full bg-gray-500"></div>
			{/if}
		{:else}
			<div>
				<img width={100} src="/icon/frame-person.svg" alt="frame" />
			</div>
		{/if}
	</div>

	<div class="m-auto w-[300px] h-14 flex justify-center items-center">
		시간 설정 공간
		<input type="number" required bind:value={inputValue} step={10} min={0} max={60} />
	</div>
	<!-- START / STOP BTN -->
	<div class="w-full flex justify-center gap-10">
		{#if $isLoading || !$isPlay}
			<!-- content here -->
			<button
				disabled={$isPlay}
				class="border-black text-xl font-bold border-2 w-[125px] h-10 rounded-lg bg-green-300 hover:scale-[1.02] duration-100"
				on:click={() => {
					start({ videoHTML, webcamHTML });
				}}>공부 시작</button
			>
		{:else}
			<button
				disabled={!$isPlay}
				class="border-black text-xl font-bold border-2 w-[125px] h-10 rounded-lg bg-green-300 hover:scale-[1.02] duration-100"
				on:click={() => {
					start({ videoHTML, webcamHTML });
				}}>일시 정지</button
			>
		{/if}

		<button
			disabled={$isLoading || !$isPlay}
			class="border-black text-xl font-bold border-2 w-[125px] h-10 rounded-lg bg-red-300 hover:scale-[1.02] duration-100"
			on:click={stop}>정지</button
		>
	</div>

	{#if $isPlay && !$isLoading}
		<!-- content here -->
		<div class="w-full mt-10">
			<ProgressBar />
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
