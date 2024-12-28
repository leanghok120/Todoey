import db from '$lib/database';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { taskId } = params;

	const deletedTask = await db.task.delete({ where: { id: parseInt(taskId) } });
	return json(deletedTask, { status: 200 });
};
