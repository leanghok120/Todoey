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
      <main className="w-full max-w-96 flex flex-col justify-center items-center gap-4 mt-8 p-5 rounded-xl border-2 shadow-lg">
        <Form className="flex gap-2">
          <Input placeholder="What do you want to do?" />
          <Button>Add</Button>
        </Form>
        <ul className="text-center">
          <li>Learn to code</li>
          <li>Build a todo list app</li>
        </ul>
      </main>
    </>
  );
}
