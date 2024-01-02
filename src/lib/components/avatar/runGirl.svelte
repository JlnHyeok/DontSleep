<div id="girl" class="-ml-[128px] -mt-[128px]"></div>

<style>
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
