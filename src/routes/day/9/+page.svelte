<script lang="ts">
	import { Title } from "$ui/alert-dialog";
    import * as Card from "$lib/components/ui/card";
	const christmas = new Date("December 25, 2023 00:00:00");
	let today = $state(new Date());

	const diff = $derived(christmas.getTime() - today.getTime());
	const days = $derived(Math.floor(diff / (1000 * 60 * 60 * 24)));
	const months = $derived(Math.floor(diff / (1000 * 60 * 60 * 24 * 30)));
	const hours = $derived(Math.floor((diff / (1000 * 60 * 60)) % 24));
	const minutes = $derived(Math.floor((diff / (1000 * 60)) % 60));
	const seconds = $derived(Math.floor((diff / 1000) % 60));

	const times = $derived({
		days,
		months,
		hours,
		minutes,
		seconds
	});

	let interval = 0;

	//현재 시간 갱신.
	$effect(() => {
		interval = window.setInterval(() => {
			today = new Date();
		}, 1000);

		return () => {
			window.clearInterval(interval);
		};
	});
</script>

<div>
	<h1 class="mb-8 w-full text-center text-7xl">Countdown to Christmas 🎄</h1>
	<div class="grid grid-cols-5 gap-3">
		{#each Object.entries(times) as [key, value]}
			<Card.Root class="p-6">
				<Card.Content class="flex flex-col items-center p-0 gap-2">
                    <!-- k: hours 등 시간 단위의 단복수형에 따라 달라짐. -->
					{@const k = value === 1 ? key.substring(0, key.length - 1) : key}
					<p class="text-6xl">{value}</p>
					<p class="text-3xl capitalize">{k}</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
