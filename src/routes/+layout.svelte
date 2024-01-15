<script lang="ts">
	import { backgroundColor } from '$lib/store';
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
	class="w-full min-w-[350px] h-screen flex justify-center items-center bg-center bg-cover {$backgroundColor}"
>
	<div
		class="w-full min-w-[350px] h-full flex items-center justify-center absolute z-0 bg-white opacity-75"
	></div>
	<div class="absolute w-full min-w-[350px] h-16 top-0 flex justify-end items-center bg-inherit">
		<!-- TITLE -->
		<div class="w-full flex justify-center">
			<span class="font-extrabold text-[36px]"> 나만의 스터디룸 </span>
		</div>
		<img
			src="/icon/setting.png"
			alt="setting"
			width="40"
			class="absolute right-4 hover:cursor-pointer"
		/>
	</div>
	<slot />
</div>
