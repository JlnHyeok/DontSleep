<div id="motion" class="-ml-[126px] -mt-[98px] z-30 ![animation-play-state:paused]"></div>

<style>
	#motion {
		scale: 0.12;
		position: absolute;
		height: 196px;
		width: calc(1024px / 4);
		background: url(/img/runwhitedog.png);
		overflow: hidden;
		animation: moving 1s steps(4) infinite;
	}
	@keyframes moving {
		from {
			background-position: 0;
		}
		to {
			background-position: 1024px;
		}
	}
</style>
