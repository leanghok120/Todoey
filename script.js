const addBtn = document.getElementById("addBtn");
const taskLists = document.getElementById("taskLists");
const taskInput = document.getElementById("taskInput");

loadTasks();

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    taskInput.value = "";

    createTaskElement(task);
    saveTask();
  }
}

function createTaskElement(taskName) {
  const taskEl = document.createElement("li");
  taskEl.className =
    "bg-primary w-full h-16 rounded-md flex justify-center items-center text-neutral font-bold text-xl shadow-md";
  taskEl.textContent = taskName;
  taskLists.appendChild(taskEl);
}

function saveTask() {
  const tasks = [];
  taskLists.querySelectorAll("li").forEach((item) => {
    tasks.push(item.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((task) => {
    createTaskElement(task);
  });
}
