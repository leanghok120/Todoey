<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { ActionData, PageData, SubmitFunction } from './$types';
	import { LoaderCircle } from 'lucide-svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let newTask = $state('');
	let loading = $state(false);

	const addTodo: SubmitFunction = async () => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<h1 class="text-4xl font-black">Todoey</h1>
<div class="mt-6 max-w-96 rounded-xl border p-8">
	<form
		class="flex w-full items-center gap-2"
		method="POST"
		action="?/addTask"
		use:enhance={addTodo}
	>
		<Input type="text" placeholder="What do  you want to do?" name="task" bind:value={newTask} />
		<Button type="submit" disabled={loading}>
			{#if loading}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				Add
			{/if}
		</Button>
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
					<form method="POST" action="?/deleteTask&id={task.id}" use:enhance>
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
