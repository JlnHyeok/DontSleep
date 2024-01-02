<div id="girl" class="-ml-[228px] -mt-[165px]"></div>

<style>
	#girl {
		scale: 0.1;
		position: absolute;
		height: 310px;
		width: calc(1369px / 3);
		background: url(/img/runcat.png);
		overflow: hidden;
		animation: animateGirl 1s steps(3) infinite;
	}
	@keyframes animateGirl {
		from {
			background-position: 0;
		}
		to {
			background-position: 1369px;
		}
	}
</style>
