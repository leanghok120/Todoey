import { db } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';
import { tasksTable } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	const tasks = await db.query.tasksTable.findMany({
		orderBy: [desc(tasksTable.id)],
		where: eq(tasksTable.userId, event.locals.user.id)
	});

	return { tasks };
};

export const actions: Actions = {
	addTask: async ({ request, locals }) => {
		const formData = await request.formData();
		const task = String(formData.get('task'));

		if (!task.trim()) {
			return fail(400, { task, missing: true });
		}

		await db.insert(tasksTable).values({
			task,
			userId: locals.user!.id
		});

		return { success: true };
	},

	deleteTask: async ({ url, locals }) => {
		const id = Number(url.searchParams.get('id'));

		const task = await db.query.tasksTable.findFirst({ where: eq(tasksTable.id, id) });
		if (!task || task.userId !== locals.user?.id) {
			return fail(400, { message: 'Invalid request' });
		}

		await db.delete(tasksTable).where(eq(tasksTable.id, id));
		return { success: true };
	},

	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/login');
	}
};
