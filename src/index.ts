interface Todo {
    text: string;
    completed: boolean;
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const taskContent = document.getElementById("taskContent")! as HTMLInputElement;
const taskContainer = document.getElementById("tasks")! as HTMLElement;
const form = document.querySelector("form")! as HTMLFormElement;

const tasks: Todo[] = readLocalStorage();
tasks.forEach(createTask);

function readLocalStorage(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
}

function saveTodos(): void {
  localStorage.setItem("todos", JSON.stringify(tasks));
}

function handleEvent(e: SubmitEvent): void {
  e.preventDefault();

  const newTask: Todo =  {
    text: taskContent.value,
    completed: false,
  };

  tasks.push(newTask);
  createTask(newTask);
  saveTodos();
  taskContent.value = "";
}

function createTask(task: Todo): void {
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