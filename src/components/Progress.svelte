<script lang="ts">
</script>

<div class="container">
	<div class="progress progress-striped">
		<div class="progress-bar"></div>
	</div>
</div>

<div class="container">
	<div class="progress2 progress-moved">
		<div class="progress-bar2"></div>
	</div>
</div>

<div class="container">
	<div class="progress progress-infinite">
		<div class="progress-bar3"></div>
	</div>
</div>

<style>
	.container {
		margin: 100px auto;
		width: 600px;
		text-align: center;
	}
	.progress {
		padding: 6px;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		box-shadow:
			inset 0 1px 2px rgba(0, 0, 0, 0.25),
			0 1px rgba(255, 255, 255, 0.08);
	}
	.progress-bar {
		height: 18px;
		background-color: #ee303c;
		border-radius: 4px;
		transition: 0.4s linear;
		transition-property: width, background-color;
	}
	.progress-striped .progress-bar {
		background-color: #3c6e71;
		width: 100%;
		background-image: linear-gradient(
			45deg,
			#353535 25%,
			transparent 25%,
			transparent 50%,
			#353535 50%,
			#353535 75%,
			transparent 75%,
			transparent
		);
		animation: progressAnimationStrike 6s;
	}
	@keyframes progressAnimationStrike {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}
	.progress2 {
		padding: 6px;
		border-radius: 30px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow:
			inset 0 1px 2px rgba(0, 0, 0, 0.25),
			0 1px rgba(255, 255, 255, 0.08);
	}
	.progress-bar2 {
		height: 18px;
		border-radius: 30px;
		background-image: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255, 0.05)
		);
		transition: 0.4s linear;
		transition-property: width, background-color;
	}
	.progress-moved .progress-bar2 {
		width: 85%;
		background-color: #ef476f;
		animation: progressAnimation 6s;
	}
	@keyframes progressAnimation {
		0% {
			width: 0%;
			background-color: #f9bcca;
		}
		100% {
			width: 85%;
			background-color: #ef476f;
		}
	}
	.progress-bar3 {
		height: 18px;
		border-radius: 4px;
		background-image: linear-gradient(
			to right,
			#355070,
			#6d597a,
			#b56576,
			#e56b6f,
			#eaac8b,
			#ff2d55
		);
		transition: 0.4s linear;
		transition-property: width, background-color;
	}
	.progress-infinite .progress-bar3 {
		width: 100%;
		background-image: linear-gradient(
			to right,
			#355070,
			#6d597a,
			#b56576,
			#e56b6f,
			#eaac8b,
			#ff2d55
		);
		animation: colorAnimation 1s infinite;
	}
	@keyframes colorAnimation {
		0% {
			background-image: linear-gradient(
				to right,
				#355070,
				#6d597a,
				#b56576,
				#e56b6f,
				#eaac8b,
				#ff2d55
			);
		}
		20% {
			background-image: linear-gradient(
				to right,
				#6d597a,
				#b56576,
				#e56b6f,
				#eaac8b,
				#ff2d55,
				#355070
			);
		}
		40% {
			background-image: linear-gradient(
				to right,
				#b56576,
				#e56b6f,
				#eaac8b,
				#ff2d55,
				#355070,
				#6d597a
			);
		}
		60% {
			background-image: linear-gradient(
				to right,
				#e56b6f,
				#eaac8b,
				#ff2d55,
				#355070,
				#6d597a,
				#b56576
			);
		}
		100% {
			background-image: linear-gradient(
				to right,
				#eaac8b,
				#ff2d55,
				#355070,
				#6d597a,
				#b56576,
				#e56b6f
			);
		}
	}
</style>
