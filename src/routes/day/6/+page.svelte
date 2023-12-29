<script lang="ts">
	import {Button} from "$ui";		

	let beats = $state(0);
	let isRunning = $state(false);
	let time = $state(0);
	let bpm = $derived(beats / (time / 60) || 0);

	let interval: number = 0;

	$effect(() => {
		if (isRunning) {
			interval = setInterval(() => {
				time += 1;
			}, 1000);
		} else {
			time = 0;
			beats = 0;
		}
		return () => clearInterval(interval);
	});
</script>

<div class="w-1/3 flex-col space-y-2">
	<p>BPM : {bpm}</p>
	<p>Time : {time}</p>
	<p>Beats : {beats}</p>

	<div class="flex gap-2 w-full justify-between">
		<Button on:click={() => (isRunning = true)} disabled={isRunning} >Start</Button>
		<Button on:click={() => {isRunning = false}} disabled={!isRunning}>Reset</Button>		
	</div>
    <Button on:click={() => (beats += 1)} disabled={!isRunning}
        class="w-full h-40"
        variant="success"
        >Beat</Button>
</div>
