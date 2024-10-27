import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Todo() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );
  const [newTask, setNewTask] = useState("");

  const [listRef] = useAutoAnimate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl max-w-96 mt-10 bg-base-200 p-10 shadow-lg">
      <form className="flex gap-2" onSubmit={addTask}>
        <input
          type="text"
          placeholder="What do you want to do?"
          className="input input-bordered w-full"
          value={newTask}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Add</button>
      </form>
      <ul
        className="w-full mt-8 flex flex-col gap-2 overflow-y-scroll max-h-[500px]"
        id="todo-container"
        ref={listRef}
      >
        {tasks.map((task, index) => (
          <li key={index} onClick={() => removeTask(index)}>
            <button className="btn btn-primary w-full h-16 text-xl">
              {task}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
