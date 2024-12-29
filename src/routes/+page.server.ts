import db from '$lib/database';
import type { Task } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const tasks: Task[] = await db.task.findMany();

	return { tasks };
};

export const actions: Actions = {
	addTask: async ({ request }) => {
		const formData = await request.formData();
		const task = String(formData.get('task'));

		if (!task) {
			return fail(400, { task, missing: true });
		}

		await db.task.create({ data: { task: task } });
		return { success: true };
	},

	deleteTask: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		await db.task.delete({ where: { id: id } });
		return { success: true };
	}
};
