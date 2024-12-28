import type { RequestHandler } from './$types';
import db from '$lib/database';
import { json } from '@sveltejs/kit';

// /api/todos GET
export const GET: RequestHandler = async () => {
	const tasks = await db.task.findMany();

	return json(tasks);
};

// /api/todos POST
export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const task = formData.get('task');

	const newTask = await db.task.create({ data: { task: task } });
	return json(newTask, { status: 201 });
};
