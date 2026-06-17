const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addButton.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    displayTasks();

    taskInput.value = "";
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        li.querySelector("span").addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        li.querySelector(".delete-btn").addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}