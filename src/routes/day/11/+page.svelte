<script lang="ts">
	import { Card, Button, Input, Label, Dialog } from "$ui";
	let { data } = $props();

	let firstName = $state("");
	let lastName = $state("");
	let open = $state(false);
	let elfName = $state("");

	const numFirstNames = $derived(data.firstNames.length);
	const numLastNames = $derived(data.lastNames.length);

	function handleSubmit(e: SubmitEvent & { currentTarget: HTMLFormElement }) {
		e.preventDefault();
		const first = data.firstNames[Math.floor(Math.random() * numFirstNames)];
		const last = data.lastNames[Math.floor(Math.random() * numLastNames)];
		elfName = `${first} ${last}`;
		open = true;
		firstName = "";
		lastName = "";
	}
</script>

<Card.Root class="m-auto w-[70vw]">
	<Card.Header>
		<Card.Title>Generate your elf name</Card.Title>
		<Card.Description>Just enter your name and we'll handle the rest.</Card.Description>
	</Card.Header>

	<Card.Content>
		<form onsubmit={handleSubmit}>
			<Label>First Name</Label>
			<Input bind:value={firstName} required />

			<Label>Last Name</Label>
			<Input bind:value={lastName} required />

			<Button type="submit" class="my-4 w-full">Generate</Button>
		</form>
	</Card.Content>
</Card.Root>

<Dialog.Root bind:open onOpenChange={(open) => {
    if (!open) elfName = "";
}}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="font-3xl text-center">Your Elf Name! ✨🧝</Dialog.Title>
		</Dialog.Header>
		<p class="text-center text-4xl">{elfName}</p>
	</Dialog.Content>
</Dialog.Root>
