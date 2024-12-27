<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	let newTask = $state('');
	let tasks = $state([]);

	function addTask(e: SubmitEvent) {
		e.preventDefault();
		if (newTask.trim()) {
			tasks.push({ task: newTask });
		}
		newTask = '';
	}
</script>

<h1 class="text-4xl font-black">Todoey</h1>
<div class="mt-6 max-w-96 rounded-xl border p-8">
	<form class="flex w-full items-center gap-2" onsubmit={addTask}>
		<Input type="text" placeholder="What do  you want to do?" bind:value={newTask} required />
		<Button type="submit">Add</Button>
	</form>
	<ul class="mt-5 space-y-2">
		{#each tasks as task}
			<li>
				<Button class="w-full" variant="outline">{task.task}</Button>
			</li>
		{/each}
	</ul>
</div>
