import type { MetaFunction } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Todoey" },
    {
      name: "description",
      content: "A simple, minimal and beautiful todo list",
    },
  ];
};

export default function Index() {
  return (
    <div className="max-w-96 p-8 bg-muted rounded-xl shadow border">
      <h1 className="text-4xl font-bold text-center mb-6">Todoey</h1>
      <Form className="flex gap-2 mb-4">
        <Input placeholder="Add a new task" className="flex-1" />
        <Button>Add</Button>
      </Form>
      <ul className="space-y-2">
        <li className="bg-background p-5 rounded-lg shadow-sm text-center">
          Learn remix
        </li>
        <li className="bg-background p-5 rounded-lg shadow-sm text-center">
          Learn shadcn ui
        </li>
        <li className="bg-background p-5 rounded-lg shadow-sm text-center">
          Build a todo app
        </li>
      </ul>
    </div>
  );
}
