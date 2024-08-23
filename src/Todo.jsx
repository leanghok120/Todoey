import { useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function removeTask(i) {
    const updatedTasks = tasks.filter((_, index) => index != i);

    setTasks(updatedTasks);
  }

  return (
    <div className="rounded-box max-w-96, mt-24 bg-base-200 p-10 shadow-md">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="What do you want to do?"
          className="input input-bordered w-full"
          value={newTask}
          onChange={handleChange}
        />
        <button className="btn btn-accent" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="w-full mt-8 flex flex-col gap-2" id="todo-container">
        {tasks.map((task, index) => (
          <li
            className="bg-primary w-full h-16 rounded-md flex justify-center items-center text-neutral font-bold text-xl shadow-md cursor-pointer"
            key={index}
            onClick={() => removeTask(index)}
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
