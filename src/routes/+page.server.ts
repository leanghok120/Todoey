import { db } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';
import { tasksTable } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const tasks = await db.query.tasksTable.findMany({ orderBy: [desc(tasksTable.id)] });

	return { tasks };
};

export const actions: Actions = {
	addTask: async ({ request }) => {
		const formData = await request.formData();
		const task = String(formData.get('task'));

		if (!task.trim()) {
			return fail(400, { task, missing: true });
		}

		await db.insert(tasksTable).values({
			task
		});

		return { success: true };
	},

	deleteTask: async ({ url }) => {
		const id = Number(url.searchParams.get('id'));

		await db.delete(tasksTable).where(eq(tasksTable.id, id));
		return { success: true };
	}
};
