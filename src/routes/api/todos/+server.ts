import type { RequestHandler } from './$types';
import db from '$lib/database';
import { json } from '@sveltejs/kit';

// /api/todos GET
export const GET: RequestHandler = async () => {
	const tasks = await db.task.findMany();

	return json(tasks);
};
