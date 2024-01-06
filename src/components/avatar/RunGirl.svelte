<div id="motion" class="-ml-[128px] -mt-[128px] ![animation-play-state:paused]"></div>

<style>
	#motion {
		scale: 0.1;
		position: absolute;
		height: 256px;
		width: calc(1536px / 6);
		background: url(/img/rungirl.avif);
		overflow: hidden;
		animation: moving 1s steps(6) infinite;
	}
	@keyframes moving {
		from {
			background-position: 0;
		}
		to {
			background-position: 1536px;
		}
	}
</style>
