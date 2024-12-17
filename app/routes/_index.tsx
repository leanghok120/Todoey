import type { MetaFunction } from "@remix-run/node";

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
  return <h1>Hello, World!</h1>;
}
