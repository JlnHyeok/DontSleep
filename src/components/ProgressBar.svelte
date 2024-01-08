<script lang="ts">
	import { timerForStudy, progressTime, studyTargetTime } from '$lib/store';
	import RunGirl from './avatar/RunGirl.svelte';
	import RunCat from './avatar/RunCat.svelte';
	import RunRabbit from './avatar/RunRabbit.svelte';
</script>

<div id="container" class="w-[300px] m-auto">
	<div id="progressBarFilling">
		<div
			id="run"
			style={`--study-target-time:${$studyTargetTime - 1}s`}
			class="absolute -top-2 w-2 h-2 run ![animation-play-state:paused]"
		>
			<RunRabbit />
		</div>
		<div
			id="fill"
			style={`--study-target-time:${$studyTargetTime - 1}s`}
			class="fill ![animation-play-state:paused]"
		></div>
	</div>
	<span>Rest</span>
	<span id="progress">{$progressTime}</span>
</div>

<style>
	* {
		--study-target-time: 3600s;
	}

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
		animation: grow var(--study-target-time) linear forwards;
		box-shadow: 0 0 8px 1px white inset;
	}
	#progressBarFilling .run {
		animation: run var(--study-target-time) linear forwards;
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
		/* text-transform: uppercase; */
		letter-spacing: 1.5px;
		margin-top: 0.7rem;
	}
	span:last-child {
		float: right;
	}
</style>
