import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import { useEffect, useState } from "react";

function Todo() {
  const [listRef] = useAutoAnimate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/todos`;

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        endpoint,
        { task: newTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  async function removeTask(id) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="rounded-2xl max-w-96 mt-10 bg-base-200 p-10 shadow-lg">
      <form className="flex gap-2" onSubmit={addTask}>
        <input
          type="text"
          placeholder="What do you want to do?"
          className="input input-bordered w-full"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />
        <button className="btn btn-primary">Add</button>
      </form>
      <ul
        className="w-full mt-8 flex flex-col gap-2 overflow-y-scroll max-h-[500px]"
        id="todo-container"
        ref={listRef}
      >
        {tasks.map((task, index) => (
          <li key={index}>
            <button
              className="btn btn-primary w-full h-16 text-xl"
              onClick={() => removeTask(task._id)}
            >
              {task.task}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
