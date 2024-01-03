<div id="motion" class="-ml-[140px] -mt-[105px] z-30"></div>

<style>
	#motion {
		scale: 0.1;
		position: absolute;
		height: 210px;
		width: calc(1681px / 6);
		background: url(/img/runcat.png);
		overflow: hidden;
		animation: moving 1s steps(6) infinite;
	}
	@keyframes moving {
		from {
			background-position: 0;
		}
		to {
			background-position: 1681px;
		}
	}
</style>
