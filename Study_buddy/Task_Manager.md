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

    .complete-btn {
        background: #28a745; /* Green */
        color: #fff;
        border: 2px solid #28a745; /* Green border */
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease, border 0.3s ease;
    }

    .complete-btn:hover {
        background: #218838; /* Darker green */
        border: 2px solid #218838; /* Darker green border */
    }

    .delete-btn {
        background: #dc3545; /* Red */
        color: #fff;
        border: 2px solid #dc3545; /* Red border */
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease, border 0.3s ease;
    }

    .delete-btn:hover {
        background: #c82333; /* Darker red */
        border: 2px solid #c82333; /* Darker red border */
    }
</style>

<div id="task-manager-container">
    <label for="title-input">Task Title:</label>
    <input type="text" id="title-input" placeholder="e.g., Study math" />

    <label for="description-input">Description:</label>
    <textarea id="description-input" placeholder="e.g., Review Chapter 2 for the test" rows="4"></textarea>

    <label for="date-input">Date to be Completed:</label>
    <input type="date" id="date-input" />

    <button id="add-task-button">Add Task</button>

    <div id="error-message"></div>

    <div id="tasks-container">
        <h2>Your Tasks</h2>
        <table id="task-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="task-list"></tbody>
        </table>
    </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const titleInput = document.getElementById("title-input");
    const descriptionInput = document.getElementById("description-input");
    const dateInput = document.getElementById("date-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");
    const errorMessage = document.getElementById("error-message");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const row = document.createElement("tr");

            // Task details
            row.innerHTML += `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.date}</td>
                <td>
                    <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </td>
            `;

            taskList.appendChild(row);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));  // Ensure tasks are always saved
    }

    // Complete task
    window.completeTask = (index) => {
        tasks.splice(index, 1);  // Remove task from the list
        renderTasks();  // Re-render the task list
    };

    // Delete task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);  // Remove task from the list
        renderTasks();  // Re-render the task list
    };

    addTaskButton.addEventListener("click", () => {
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const date = dateInput.value;

        // Clear previous error message
        errorMessage.textContent = "";

        // Validate input
        if (!title || !description || !date) {
            errorMessage.textContent = "Please ensure that all fields are filled out and the date is correct.";
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date < today) {
            errorMessage.textContent = "Please ensure the date is correct and not in the past.";
            return;
        }

        tasks.push({ title, description, date });
        renderTasks();

        // Clear the inputs
        titleInput.value = descriptionInput.value = dateInput.value = "";
    });

    renderTasks();
});
</script>