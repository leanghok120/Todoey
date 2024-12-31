import { pgTable, text, integer } from 'drizzle-orm/pg-core';

export const tasksTable = pgTable('tasks', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	task: text('task')
});
