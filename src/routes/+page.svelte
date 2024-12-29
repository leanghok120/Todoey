<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let newTask = $state('');
</script>

<h1 class="text-4xl font-black">Todoey</h1>
<div class="mt-6 max-w-96 rounded-xl border p-8">
	<form class="flex w-full items-center gap-2" method="POST" action="?/addTask" use:enhance>
		<Input type="text" placeholder="What do  you want to do?" name="task" bind:value={newTask} />
		<Button type="submit">Add</Button>
	</form>
	{#if form?.missing}
		<p class="error">Task is required</p>
	{/if}

	{#if data.tasks.length === 0}
		<p class="mt-5">No tasks yet. Add your first task!</p>
	{:else}
		<ul class="mt-5 space-y-2">
			{#each data.tasks as task}
				<li>
					<form method="POST" action="?/deleteTask" use:enhance>
						<input type="hidden" name="id" value={task.id} />
						<Button class="w-full" variant="outline" type="submit">{task.task}</Button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.error {
		color: tomato;
	}
</style>
