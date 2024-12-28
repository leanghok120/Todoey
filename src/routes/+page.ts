import type { Task } from '@prisma/client';

export const load = async (event) => {
	const response = await event.fetch('/api/todos');
	const tasks: Task[] = await response.json();

	return { tasks };
};
