<div id="motion" class="-ml-[280px] -mt-[280px] z-30 ![animation-play-state:paused]"></div>

<style>
	#motion {
		scale: 0.08;
		position: absolute;
		height: 560px;
		width: calc(3360px / 6);
		background: url(/img/runslime.png);
		overflow: hidden;
		animation: moving 1s steps(6) infinite;
	}
	@keyframes moving {
		from {
			background-position: 0;
		}
		to {
			background-position: 3360px;
		}
	}
</style>
