<script lang="ts">
	import { backgroundColor } from '$lib/store';
	import { onMount } from 'svelte';
	import '../app.css';
	import { isPip } from '$lib/store';
	import SettingModal from '$components/modal/SettingModal.svelte';
	import { browser } from '$app/environment';

	let showSettingModal: boolean = false;

	onMount(() => {
		document.addEventListener('enterpictureinpicture', () => {
			$isPip = true;
		});
		document.addEventListener('leavepictureinpicture', () => {
			$isPip = false;
		});
	});
</script>

{#if browser}
	<!-- content here -->
	<div
		class="w-full min-w-[350px] h-screen flex justify-center items-center bg-center bg-cover {$backgroundColor}"
	>
		<div
			class="w-full min-w-[350px] h-screen flex items-center justify-center absolute z-0 bg-white opacity-75"
		></div>
		<div class="absolute w-full min-w-[350px] h-16 top-0 flex justify-end items-center bg-inherit">
			<!-- TITLE -->
			<div class="w-full flex justify-center">
				<span class="font-extrabold text-[36px]"> 정신과 시간의 방 </span>
			</div>
			<button on:click={() => (showSettingModal = true)} class="absolute right-4">
				<img src="/icon/setting.png" alt="setting" width="40" />
			</button>
		</div>
		<slot />
		<SettingModal bind:showModal={showSettingModal} />
	</div>
{/if}
