"use strict";
const btn = document.getElementById("btn");
const taskContent = document.getElementById("taskContent");
const taskContainer = document.getElementById("tasks");
const form = document.querySelector("form");
const tasks = readLocalStorage();
tasks.forEach(createTask);
function readLocalStorage() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(tasks));
}
function handleEvent(e) {
    e.preventDefault();
    const newTask = {
        text: taskContent.value,
        completed: false,
    };
    tasks.push(newTask);
    createTask(newTask);
    saveTodos();
    taskContent.value = "";
}
function createTask(task) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'm-2';
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        saveTodos();
    });
    li.innerText = task.text;
    li.className = "list-group-item";
    li.append(checkbox);
    taskContainer.appendChild(li);
}
form.addEventListener("submit", handleEvent);
