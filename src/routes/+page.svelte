<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { Task } from '@prisma/client';

	let { data }: { tasks: Task[] } = $props();

	let newTask = $state('');

	async function addTask(e: SubmitEvent) {
		e.preventDefault();

		if (newTask.trim()) {
			const formData = new FormData();
			formData.append('task', newTask);

			const response = await fetch('/api/todos', { method: 'POST', body: formData });

			if (response.ok) {
				invalidate('/api/todos');
			} else {
				console.error('Failed to add task');
			}
		}

		newTask = '';
	}

	async function deleteTask(taskId) {
		await fetch(`/api/todos/${taskId}`, { method: 'DELETE' });
		invalidate('/api/todos');
	}
</script>

<h1 class="text-4xl font-black">Todoey</h1>
<div class="mt-6 max-w-96 rounded-xl border p-8">
	<form class="flex w-full items-center gap-2" onsubmit={addTask}>
		<Input
			type="text"
			placeholder="What do  you want to do?"
			name="task"
			bind:value={newTask}
			required
		/>
		<Button type="submit">Add</Button>
	</form>

	{#if data.tasks.length === 0}
		<p>No tasks yet. Add your first task!</p>
	{:else}
		<ul class="mt-5 space-y-2">
			{#each data.tasks as task}
				<li>
					<Button class="w-full" variant="outline" onclick={() => deleteTask(task.id)}
						>{task.task}</Button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
