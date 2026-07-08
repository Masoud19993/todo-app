let tasks = [];

export function getTasks() {
  return tasks;
}

export function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function addTask(taskText) {
  const task = {
    id: Date.now() + Math.random(),
    text: taskText
  };

  tasks.push(task);
  saveTasks();

  return task;
}

export function deleteTask(taskId) {
  tasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  saveTasks();
}