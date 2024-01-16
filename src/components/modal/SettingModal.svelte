<script lang="ts">
	import RunCat from './../avatar/RunCat.svelte';
	import { beep } from '$lib/sound';
	import { backgroundColor, runAvartar } from '$lib/store';
	import RunGirl from '$components/avatar/RunGirl.svelte';
	import RunRabbit from '$components/avatar/RunRabbit.svelte';
	import RunSlime from '$components/avatar/RunSlime.svelte';
	import RunWhiteDog from '$components/avatar/RunWhiteDog.svelte';
	import RunBrownDog from '$components/avatar/RunBrownDog.svelte';
	import RunBird from '$components/avatar/RunBird.svelte';
	import RunDoraemong from '$components/avatar/RunDoraemong.svelte';
	export let showModal: boolean; // boolean

	let dialog: HTMLDialogElement; // HTMLDialogElement

	// Generate avatar Component List
	const avatarList = [
		{ name: 'RunCat', component: RunCat },
		{ name: 'RunGirl', component: RunGirl },
		{ name: 'RunRabbit', component: RunRabbit },
		{ name: 'RunSlime', component: RunSlime },
		{ name: 'RunWhiteDog', component: RunWhiteDog },
		{ name: 'RunBrownDog', component: RunBrownDog },
		{ name: 'RunBird', component: RunBird },
		{ name: 'RunDoraemong', component: RunDoraemong }
	];

	// Generate bg Color List
	const colorList = [
		'bg-gray-500',
		'bg-blue-400',
		'bg-green-600',
		'bg-yellow-400',
		'bg-orange-400',
		'bg-red-400',
		'bg-stone-400',
		'bg-purple-400',
		'bg-pink-400',
		'bg-violet-400'
	];

	function onClickButton() {
		dialog.close();
	}

	function onClickColorButton(color: string) {
		$backgroundColor = color;
		localStorage.setItem('backgroundColor', color);
	}

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="bg-transparent outline-none"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<!-- svelte-ignore a11y-autofocus -->
		<div
			class="xs:w-[450px] w-[340px] h-[500px] box-border p-3 flex justify-center bg-white rounded-xl"
		>
			<div class="flex flex-col justify-evenly w-full h-full">
				<div class="w-full h-28 flex flex-col justify-center rounded-xl overflow-hidden">
					<div class="h-1/3 flex justify-center items-center bg-gray-200">
						<span class="font-semibold">현재 색상</span>
						<div
							class="{$backgroundColor} w-10 h-6 rounded-md absolute xs:right-1/3 right-[30%]"
						></div>
					</div>
					<div class="bg-gray-200 h-2/3 grid grid-cols-5 gap-1 px-2 pb-2">
						{#each colorList as color}
							<!-- content here -->
							<button on:click={() => onClickColorButton(color)} class="{color} rounded-md"
							></button>
						{/each}
					</div>
				</div>
				<div class="w-full h-28 flex flex-col justify-center rounded-xl overflow-hidden">
					<div class="h-1/3 flex justify-center items-center bg-gray-200">
						<span class="font-semibold">진행 아이콘</span>
						<div class="w-10 rounded-md absolute xs:right-[30%] right-[23%]">
							<svelte:component this={$runAvartar.component} />
						</div>
					</div>
					<div class="bg-gray-200 h-2/3 grid grid-cols-5 gap-4 pt-3 px-2 pb-2">
						{#each avatarList as avatar}
							<!-- content here -->
							<div class="pl-[50%] scale-[0.88] xs:pt-[5%] pt-[10%] border-[1px]">
								<svelte:component this={avatar.component} />
							</div>
						{/each}
					</div>
				</div>
				<div class="w-full h-28 flex justify-center">알람 감지 시간</div>
				<div class="w-full h-28 flex justify-center">진동 모드</div>
			</div>
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
