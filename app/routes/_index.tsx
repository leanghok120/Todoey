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
    <>
      <h1 className="font-bold text-5xl">Todoey</h1>
      <main className="w-full max-w-96 flex flex-col justify-center items-center gap-4 mt-8 p-8 rounded-xl border shadow-md">
        <Form className="flex gap-2">
          <Input placeholder="What do you want to do?" />
          <Button>Add</Button>
        </Form>
        <ul className="text-center space-y-3 w-3/4">
          <li>
            <Button className="w-full" variant="outline">
              Learn remix
            </Button>
          </li>
          <li>
            <Button className="w-full" variant="outline">
              Learn drizzle
            </Button>
          </li>
          <li>
            <Button className="w-full" variant="outline">
              Build a todo app
            </Button>
          </li>
        </ul>
      </main>
    </>
  );
}
