<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { isPip } from '$lib/store';

	onMount(() => {
		document.addEventListener('enterpictureinpicture', () => {
			$isPip = true;
		});
		document.addEventListener('leavepictureinpicture', () => {
			$isPip = false;
		});
	});
</script>

<div
	class="w-full h-screen flex justify-center items-center bg-[url('/img/bg2.png')] bg-center bg-cover"
>
	<div
		class="w-full h-screen flex items-center justify-center absolute z-0 bg-white opacity-75"
	></div>
	<slot />
</div>
