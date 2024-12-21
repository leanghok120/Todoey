import type { MetaFunction } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Todoey" },
    {
      name: "description",
      content: "A simple, minimal and beautiful todo list",
    },
  ];
};

export async function action({ request }) {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  const taskId = formData.get("id");

  if (actionType === "create") {
    const task = formData.get("task");
    if (!task) throw new Error("Task is required.");
    return await db.task.create({ data: { task: task } });
  }

  if (actionType === "delete" && taskId) {
    await db.task.delete({ where: { id: parseInt(taskId) } });
    return null;
  }

  throw new Error("Invalid action.");
}

export async function loader() {
  const tasks = await db.task.findMany();
  return tasks;
}

export default function Index() {
  const tasks = useLoaderData<typeof loader>();

  return (
    <div className="max-w-96 p-8 bg-muted rounded-xl shadow border">
      <h1 className="text-4xl font-bold text-center mb-6">Todoey</h1>
      <Form className="flex gap-2 mb-4" method="post">
        <Input
          placeholder="Add a new task"
          className="flex-1"
          name="task"
          id="task"
        />
        <Button name="_action" value="create">
          Add
        </Button>
      </Form>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <Form method="post" key={task.id}>
            <li
              className="bg-background p-4 rounded-lg shadow-sm text-center cursor-pointer"
              onClick={() =>
                document.getElementById(`delete-${task.id}`)?.click()
              }
            >
              {task.task}
            </li>
            <input type="hidden" name="id" value={task.id} />
            <button
              id={`delete-${task.id}`}
              type="submit"
              name="_action"
              value="delete"
              className="hidden"
            >
              Delete
            </button>
          </Form>
        ))}
      </ul>
    </div>
  );
}
