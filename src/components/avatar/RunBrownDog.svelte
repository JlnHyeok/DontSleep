<div id="motion" class="-ml-[126px] -mt-[76px] z-30 ![animation-play-state:paused]"></div>

<style>
	#motion {
		scale: 0.11;
		position: absolute;
		height: 152px;
		width: calc(1024px / 4);
		background: url(/img/runbrowndog.png);
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
