const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");

let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });

      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

function addTask(taskText) {
  const task = {
    id: Date.now() + Math.random(),
    text: taskText
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
}

async function loadSuggestions() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des suggestions");
    }

    const suggestions = await response.json();

    suggestions.forEach(function (suggestion) {
      addTask(suggestion.title);
    });
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

  input.value = "";
});

loadTasks();
renderTasks();

if (tasks.length === 0) {
  loadSuggestions();
}