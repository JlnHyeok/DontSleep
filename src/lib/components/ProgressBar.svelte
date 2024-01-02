<script lang="ts">
	import { onMount } from 'svelte';
	import RunGirl from './avatar/RunGirl.svelte';
	import RunCat from './avatar/RunCat.svelte';

	onMount(() => {
		var elm = document.querySelector('#progress');
		setInterval(function () {
			if (!elm.innerHTML.match(/100%/gi)) {
				elm.innerHTML = parseInt(elm.innerHTML) + 1 + '%';
			} else {
				clearInterval();
			}
		}, 200000 / 100);
	});
</script>

<div id="container" class="w-[300px] m-auto">
	<label for="water">
		<div id="run" class="absolute -top-2 w-2 h-2">
			<RunCat />
		</div>
		<div id="fill"></div>
	</label>
	<span>Progress</span>
	<span id="progress">0%</span>
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

	input {
		display: none;
	}
	label {
		position: relative;
		display: block;
		width: 100%;
		height: 24px;
		background: transparent;
		border-radius: 0.4rem;
		border: 2px solid white;
		box-shadow: -2px 0 8px 0 rgba(255, 255, 255, 0.6);
	}
	label #fill {
		position: absolute;
		top: 0;
		left: 0;
		background: linear-gradient(to bottom, #a3e2ef 35%, #4f9cc0);
		height: 100%;
		width: 0%;
		animation: grow 200s linear forwards;
		box-shadow: 0 0 8px 1px white inset;
	}
	label #run {
		animation: run 200s linear forwards;
	}
	label #fill:before {
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
	#girl {
		scale: 0.1;
		position: absolute;
		height: 256px;
		width: calc(1536px / 6);
		background: url(/img/rungirl.avif);
		overflow: hidden;
		animation: animateGirl 1s steps(6) infinite;
	}
	@keyframes animateGirl {
		from {
			background-position: 0;
		}
		to {
			background-position: 1536px;
		}
	}
</style>
