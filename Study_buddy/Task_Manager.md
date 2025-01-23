---
layout: base
title: Task Manager
permalink: /task_manager
---

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Task Manager</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
<style>
    #task-manager-container {
        margin: 2rem auto;
        max-width: 700px;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    label {
        display: block;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    input, textarea {
        width: 100%;
        padding: 0.8rem;
        margin-bottom: 1.2rem;
        border: 1px solid #fff;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    input:focus, textarea:focus {
        outline: none;
        border-color: #ffd700;
        box-shadow: 0 0 5px #ffd700;
    }

    button {
        width: 100%;
        padding: 1rem;
        background: #ffd700;
        color: #000;
        border: none;
        border-radius: 8px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background 0.3s ease;
        margin-bottom: 1.2rem;
    }

    button:hover {
        background: #ffc700;
    }

    #error-message {
        color: #ff3b3b;
        font-size: 1.1rem;
        text-align: center;
        margin-top: 1rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }

    th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #fff;
    }

    th {
        font-weight: 600;
        background: #2575fc;
        color: #fff;
    }

    tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.05);
    }

    tr:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    #random-task-container {
        margin-top: 2rem;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    #random-task-container h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
        margin-bottom: 1rem;
    }

    #random-task-box {
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        border-radius: 8px;
        margin-bottom: 1.2rem;
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
    }

    #random-task-button {
        padding: 1rem;
        background: #ffd700;
        color: #000;
        border: none;
        border-radius: 8px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    #random-task-button:hover {
        background: #ffc700;
    }
</style>

<div id="task-manager-container">
    <label for="title-input">Task Title:</label>
    <input type="text" id="title-input" placeholder="e.g., Study math" />

    <label for="description-input">Description:</label>
    <textarea id="description-input" placeholder="e.g., Review Chapter 2 for the test" rows="4"></textarea>

    <button id="add-task-button">Add Task</button>

    <div id="error-message"></div>

    <div id="tasks-container">
        <h2>Your Tasks</h2>
        <table id="task-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="task-list"></tbody>
        </table>
    </div>
</div>

<!-- Random Task Section -->
<div id="random-task-container">
    <h2>Get a Random Task Idea</h2>
    <div id="random-task-box">
        Click the button to get a random task!
    </div>
    <button id="random-task-button">Get Random Task</button>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const titleInput = document.getElementById("title-input");
    const descriptionInput = document.getElementById("description-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");
    const errorMessage = document.getElementById("error-message");
    const randomTaskBox = document.getElementById("random-task-box");
    const randomTaskButton = document.getElementById("random-task-button");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const row = document.createElement("tr");

            row.innerHTML += `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </td>
            `;

            taskList.appendChild(row);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Delete task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Function to add task to the backend
    async function addTaskToBackend(task) {
        try {
            const response = await fetch("http://127.0.0.1:8887/api/addtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task }),
            });

            if (!response.ok) {
                throw new Error("Failed to add task to the backend.");
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error(error.message);
        }
    }

    addTaskButton.addEventListener("click", () => {
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        errorMessage.textContent = "";

        if (!title || !description) {
            errorMessage.textContent = "Please fill out all fields.";
            return;
        }

        const task = `${title} - ${description}`;
        tasks.push({ title, description });

        // Add task to backend
        addTaskToBackend(task);

        renderTasks();

        titleInput.value = "";
        descriptionInput.value = "";
    });

    // Fetch random task from API
    randomTaskButton.addEventListener("click", async () => {
        try {
            const response = await fetch("http://127.0.0.1:8887/api/tasks/random");
            const data = await response.json();
            randomTaskBox.textContent = data.task;
        } catch (error) {
            randomTaskBox.textContent = "Could not fetch a task. Please try again.";
        }
    });

    renderTasks();
});
</script>
