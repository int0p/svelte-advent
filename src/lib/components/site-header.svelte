<script lang="ts">
	import { cn } from "$lib/utils";
	import { buttonVariants } from "$ui/button";
</script>

<header
	class="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur"
>
	<div class="container flex h-14 items-center">
		<div class="flex">
			<a
				href="/"
				class="mr-6 flex items-center justify-between w-full space-x-2 hover:text-primary/90 transition-colors ease-linear"
			>
				<span class="font-bold sm:inline-block text-[15px] lg:text-base">
					Advent of Svelte 2023
				</span>
			</a>
		</div>
		<div class="flex flex-1 items-center space-x-2 sm:space-x-4 justify-end">
			<nav class="flex items-center">
				<a href="https://github.com/huntabyte/advent-of-svelte-2023" target="_blank">
					<div
						class={cn(
							buttonVariants({
								size: "sm",
								variant: "ghost"
							}),
							"w-9 px-0"
						)}
					>
					from
						<span class="sr-only">GitHub</span>
					</div>
				</a>	
				<a href="https://github.com/int0p/svelte-advent" target="_blank">
					<div
						class={cn(
							buttonVariants({
								size: "sm",
								variant: "ghost"
							}),
							"w-9 px-0"
						)}
					>
					to
						<span class="sr-only">GitHub</span>
					</div>
				</a>				
			</nav>
		</div>
	</div>
</header>
