const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskLists = document.getElementById("taskLists");

function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName) {
    taskInput.value = "";
    createTaskElement(taskName);
  }
}

function createTaskElement(task) {
  const taskEl = document.createElement("li");
  taskEl.textContent = task;
  taskLists.appendChild(taskEl);
}
