<script lang="ts">
	import { isPlay, progressTime, timerForStudy } from '$lib/store';
	import { onMount } from 'svelte';
	import RunGirl from './avatar/RunGirl.svelte';
	import RunCat from './avatar/RunCat.svelte';
	import RunRabbit from './avatar/RunRabbit.svelte';
	import Timer from 'timer.js';

	export let studyTargetTime: number = 5;

	let currentTime: number = 0;
	let timer = new Timer({
		tick: 1,
		ontick: function (sec: any) {
			console.log(Math.round(sec / 1000));
		},
		onend: function () {
			console.log('end');
		},
		onpause: function () {
			console.log('pause');
		}
	});
	timer.start(studyTargetTime);
	setTimeout(() => {
		timer.pause();
	}, 3000);
	onMount(() => {
		if ($isPlay == 'play') {
			$timerForStudy = setInterval(function () {
				$progressTime++;
			}, studyTargetTime / 100);
		}
	});
	$: currentTime = timer.getDuration;
</script>

<div id="container" class="w-[300px] m-auto">
	<div id="progressBarFilling">
		<div id="run" class="absolute -top-2 w-2 h-2 run ![animation-play-state:paused]">
			<RunRabbit />
		</div>
		<div id="fill" class="fill ![animation-play-state:paused]"></div>
	</div>
	<span>Progress</span>
	<span id="progress">{$progressTime}%</span>
</div>

<style>
	@keyframes grow {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}
	@keyframes run {
		from {
			transform: translateX(0px);
		}
		to {
			transform: translateX(300px);
		}
	}

	#progressBarFilling {
		position: relative;
		display: block;
		width: 100%;
		height: 24px;
		background: transparent;
		border-radius: 0.4rem;
		border: 2px solid white;
		box-shadow: -2px 0 8px 0 rgba(255, 255, 255, 0.6);
	}
	#progressBarFilling .fill {
		position: absolute;
		top: 0;
		left: 0;
		background: linear-gradient(to bottom, #a3e2ef 35%, #4f9cc0);
		height: 100%;
		width: 0%;
		animation: grow 200s linear forwards;
		box-shadow: 0 0 8px 1px white inset;
	}
	#progressBarFilling .run {
		animation: run 200s linear forwards;
	}

	#progressBarFilling .fill:before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/172299/bubbles-mask.gif);
		mix-blend-mode: overlay;
		opacity: 0.99;
	}
	span {
		display: inline-block;
		color: #4f9cc0;
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		margin-top: 0.7rem;
	}
	span:last-child {
		float: right;
	}
</style>
