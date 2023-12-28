<script lang="ts">
	import type { Task } from "./+page";
	import * as Card from "$ui/card";

	type ElfData = {
		tasks: Task[];
		minPerTask: number;
	};

	let { data } = $props();
	let tasks = $state<Task[]>([...data.tasks]);
	const elfData = $derived(getTasksByElf());

	function getTasksByElf() {
		const elfData: Record<string, ElfData> = {};
		
		tasks?.forEach((task) => {
			if (!elfData[task.elf]) {
				Object.assign(elfData, { [task.elf]: { tasks: [] } });
			}
			const val = elfData[task.elf];

			val?.tasks.push(task);
		});
		Object.entries(elfData).forEach(([elf, data]) => {
			const totalMin = data.tasks.reduce((acc, task) => acc + task.minutesTaken, 0);
			const val = elfData[elf];

			if (val) {
				val.minPerTask = totalMin / data.tasks.length;
			}
		});

		return elfData;
	}
</script>

<div class="grid w-full grid-cols-3 gap-3">
	{#each Object.entries(elfData) as [elf, data]}
		<Card.Root>
			<Card.Header>
				<Card.Title>{elf}</Card.Title>
				<Card.Description>Tasks</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Tasks Completed: {data.tasks.length}</p>
				<p>Avg min./task: {data.minPerTask.toFixed(2)}</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
