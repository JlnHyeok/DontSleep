<script lang="ts">
	import '../app.css';
</script>

<div
	class="w-full h-screen flex justify-center items-center bg-[url('/img/bg2.avif')] bg-center bg-cover"
>
	<div
		class="w-full h-full flex items-center justify-center absolute z-0 bg-white opacity-75"
	></div>
	<slot />
</div>
