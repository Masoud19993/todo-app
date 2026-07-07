const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();

  if (taskText === "") {
    return;
  }

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";

  deleteButton.addEventListener("click", function () {
      li.remove();
    });

  li.appendChild(span);
  li.appendChild(deleteButton);

  taskList.appendChild(li);

  input.value = "";
});