<div id="motion" class="-ml-[231px] -mt-[177px] z-30 ![animation-play-state:paused]"></div>

<style>
	#motion {
		scale: 0.08;
		position: absolute;
		height: 354px;
		width: calc(1850px / 4);
		background: url(/img/runbird.png);
		overflow: hidden;
		animation: moving 1s steps(4) infinite;
	}
	@keyframes moving {
		from {
			background-position: 0;
		}
		to {
			background-position: 1850px;
		}
	}
</style>
