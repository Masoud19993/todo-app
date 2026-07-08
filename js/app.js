import {
  getTasks,
  loadTasks,
  addTask,
  deleteTask
} from "./tasks.js";

import { getTaskSuggestions } from "./api.js";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");

function renderTasks() {
  taskList.innerHTML = "";

  const tasks = getTasks();

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";

    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

async function loadSuggestions() {
  try {
    const suggestions = await getTaskSuggestions();

    suggestions.forEach(function (suggestion) {
      addTask(suggestion.title);
    });

    renderTasks();
  } catch (error) {
    errorMessage.textContent = "Impossible de charger les suggestions de tâches.";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();

  if (taskText === "") {
    return;
  }

  addTask(taskText);
  renderTasks();

  input.value = "";
});

loadTasks();
renderTasks();

if (getTasks().length === 0) {
  loadSuggestions();
}