<script lang="ts">
	import type { Present } from "./+page.js";

	import {Button, Progress} from "$ui";		

	let { data } = $props();

	let presents = $state([...data.presents]);
	let sleighPresents = $state<Present[]>([]);

	const MAX_LOAD = 100;
	const currentLoad = $derived(sleighPresents.reduce((acc, item) => acc + item.weight, 0));

    $effect(() =>{
        presents.sort((a, b) => b.weight - a.weight);
    });
</script>

<div>
	<p>Current Load : {currentLoad}</p>
	<Progress max={MAX_LOAD} value={currentLoad} />
</div>

<div class="flex items-start w-full my-4 gap-3">
    <div class="w-full border rounded-lg">
        <h2 class="py-2 text-xl font-bold text-center">Available Presents</h2>
        <ul class="grid grid-cols-3 gap-2">
            {#each presents as present, i }
                {#if currentLoad <= MAX_LOAD}
                <li>
                    <Button
                        variant="ghost"
                        on:click={() => {
                            sleighPresents.push(presents.splice(i,1)[0]!);
                        }}
                    >
                        {present.name} : {present.weight}
                    </Button>
                </li>
                {/if}
            {/each}
        </ul>
    </div>

    <div class="w-full min-w-1/2 border rounded-lg">
        <h2 class="py-2 text-xl font-bold text-center">Sleigh Presents</h2>
        <ul class="grid grid-cols-3 gap-2">
            {#each sleighPresents as present, i }
                <li>
                    <Button
                        variant="ghost"
                        on:click={() => {
                            presents.push(sleighPresents.splice(i,1)[0]!);
                        }}
                    >
                        {present.name} : {present.weight}
                    </Button>
                </li>
            {/each}
        </ul>
    </div>
</div>
