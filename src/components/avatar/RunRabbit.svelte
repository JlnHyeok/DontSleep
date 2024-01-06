<div id="motion" class="-ml-[106px] -mt-[120px] z-30 ![animation-play-state:paused]"></div>

<style>
	#motion {
		scale: 0.15;
		position: absolute;
		height: 232px;
		width: calc(1700px / 8);
		background: url(/img/runrabbit.png);
		overflow: hidden;
		animation: moving 1s steps(8) infinite;
	}
	@keyframes moving {
		from {
			background-position: 0;
		}
		to {
			background-position: 1700px;
		}
	}
</style>
