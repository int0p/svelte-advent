<script lang="ts">
  import { Cookie } from "phosphor-svelte";
  import { Button } from "$ui/button";
  import { Progress } from "$ui/progress";

  let count = $state(0);

  function getSantasMood() {
    if (count * 10 > 100) return 100;
    return count * 10;
  }

  let mood = $derived(getSantasMood());
</script>

<div class="flex flex-col w-full gap-4">
  <Progress value={mood} />
  <div class="flex gap-2 h-6 items-center">
    {#each Array(count) as _}
      <Button variant = "ghost" on:click={() => (count -= 1)}><Cookie class="h-6 w-6" /></Button>
    {/each}
  </div>
  <div class="flex items-center gap-2">
    <Button on:click={() => (count += 1)}>Add cookie</Button>
    <Button on:click={() => (count -= 1)}>Remove cookie</Button>
    <Button on:click={() => (count = 0)}>Reset cookie</Button>
  </div>
</div>
