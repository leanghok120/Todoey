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
  const task = await formData.get("task");

  return await db.task.create({ data: { task: task } });
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
        <Button>Add</Button>
      </Form>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            className="bg-background p-4 rounded-lg shadow-sm text-center"
            key={task.id}
          >
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  );
}
