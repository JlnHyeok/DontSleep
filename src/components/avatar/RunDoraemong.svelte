<div id="motion" class="-ml-[120px] -mt-[134px] z-30 ![animation-play-state:paused]"></div>

<style>
	#motion {
		scale: 0.1;
		position: absolute;
		height: 268px;
		width: calc(960px / 4);
		background: url(/img/rundoraemong.png);
		overflow: hidden;
		animation: moving 1s steps(4) infinite;
	}
	@keyframes moving {
		from {
			background-position: 0;
		}
		to {
			background-position: 960px;
		}
	}
</style>
