<script lang="ts">
	import { Button } from "$ui/button";
	import { Game } from "./state.svelte";
	let game = new Game(12);
</script>

<div class="flex-col space-y-4">

<div class="flex-col">
	<h1>Match the cards</h1>
	<p>High Score : {game.highScore}</p>
	<p>Time: {game.time}</p>
    <p>Matches: {game.matches.length}</p>
</div>

<div class="flex w-full justify-between">
	<Button variant="success" onclick={game.startGame}>Start Game</Button>
	<Button variant="destructive" onclick={game.resetGame}>Reset Game</Button>
</div>

{#if game.status == "in progress"}
	<div class="grid grid-cols-6 gap-3 w-full h-full">
		{#each game.cards as card, i}
			<Button class="h-auto w-full relative" variant="ghost" onclick={()=>game.checkMatch(i)}>
                <img
					src="https://advent.sveltesociety.dev/data/2023/day-eight/{card}.png"
					alt=""
					class="h-full w-full object-cover"
				/>
                {#if !game.selected.includes(i) && !game.matches.includes(card)}
					<div class="bg-muted absolute inset-0" />
				{/if}
            </Button>
		{/each}
	</div>
{/if}
</div>
