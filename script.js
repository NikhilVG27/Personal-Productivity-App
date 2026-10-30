
// =====================================
// DAY 2 - TO DO LIST APPLICATION
// =====================================


// 1. SELECT HTML ELEMENTS

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const clearBtn = document.getElementById("clearBtn");


// 2. INITIALIZE TASKS

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// 3. SAVE TASKS IN LOCAL STORAGE

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// 4. ADD NEW TASK

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task!");

        return;
    }

    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };

    tasks.push(task);

    taskInput.value = "";

    saveTasks();

    renderTasks();

}


// 5. DISPLAY TASKS

function renderTasks() {

    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {

        if (currentFilter === "active") {

            return !task.completed;

        }

        if (currentFilter === "completed") {

            return task.completed;

        }

        return true;

    });


    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {

            li.classList.add("completed");

        }


        // CREATE CHECKBOX

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {

            toggleTask(task.id);

        });


        // CREATE TASK TEXT

        const span = document.createElement("span");

        span.textContent = task.text;


        // CREATE DELETE BUTTON

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {

            deleteTask(task.id);

        });


        // ADD ELEMENTS TO LIST

        li.append(checkbox, span, deleteBtn);

        taskList.appendChild(li);

    });


    updateStats();

}


// 6. MARK TASK AS COMPLETED

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {

                ...task,

                completed: !task.completed

            };

        }

        return task;

    });

    saveTasks();

    renderTasks();

}


// 7. DELETE INDIVIDUAL TASK

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

}


// 8. UPDATE TASK STATISTICS

function updateStats() {

    const completed = tasks.filter(task => task.completed).length;

    const pending = tasks.length - completed;

    totalTasks.textContent = tasks.length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

}


// 9. FILTER TASKS

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        document.querySelectorAll(".filter").forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        renderTasks();

    });

});


// 10. CLEAR COMPLETED TASKS

clearBtn.addEventListener("click", () => {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    renderTasks();

});


// 11. ADD TASK USING BUTTON

addBtn.addEventListener("click", addTask);


// 12. ADD TASK USING ENTER KEY

taskInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        addTask();

    }

});


// 13. LOAD SAVED TASKS WHEN PAGE OPENS

renderTasks();


// =====================================
// END OF DAY 2 JAVASCRIPT PROJECT
// =====================================
