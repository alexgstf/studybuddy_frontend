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
    /* Global Styles */
    body {
        font-family: 'Poppins', sans-serif;
        background-color: #1c1c1c;
        color: #fff;
        margin: 0;
        padding: 0;
    }

    h2 {
        font-size: 1.5rem;
        color: #fff;
        font-weight: 600;
    }

    .container {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 2rem;
        box-sizing: border-box;
    }

    /* Task Manager Container */
    #task-manager-container {
        max-width: 750px;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        padding: 2rem;
        margin-top: 2rem;
    }

    label {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        display: block;
        color: #d1d1d1;
    }

    input {
        width: 100%;
        padding: 0.8rem;
        margin-bottom: 1.2rem;
        border: 1px solid #fff;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        font-size: 1rem;
        outline: none;
        transition: 0.3s;
    }

    input:focus {
        border-color: #2575fc;
        background: rgba(255, 255, 255, 0.2);
    }

    button {
        width: 100%;
        padding: 1rem;
        background: #ffd700;
        color: #000;
        border: none;
        border-radius: 10px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background 0.3s ease;
        margin-bottom: 1rem;
    }

    button:hover {
        background: #ffc700;
    }

    /* Task List */
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 2rem;
        color: #fff;
    }

    th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #fff;
    }

    th {
        background: #2575fc;
        font-weight: 600;
    }

    tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.1);
    }

    tr:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    /* Edit Task Section */
    #edit-task-container {
        display: none;
        position: fixed; /* Fix position to the center */
        top: 50%; /* Vertically center */
        left: 50%; /* Horizontally center */
        transform: translate(-50%, -50%); /* Offset by 50% of its size to perfectly center */
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        border-radius: 15px;
        padding: 2rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        z-index: 1000; /* Ensure it's on top of other content */
        width: 400px; /* Set a width for the popup */
    }

    #edit-task-container h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #fff;
    }

    /* Random Task Section */
    #random-task-container {
        margin-top: 2rem;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        border-radius: 15px;
        padding: 2rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        width: 100%; /* Ensure container takes full width */
    }

    #random-task-container h2 {
        margin-bottom: 1.2rem;
    }

    #random-task-box {
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        border-radius: 10px;
        margin-bottom: 1.2rem;
        min-height: 50px;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%; /* Make box take full width */
    }

    #random-task-button {
        padding: 1rem;
        background: #2575fc;
        color: #fff;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.3s ease;
        font-size: 1rem;
        width: 100%; /* Make button take full width */
    }

    #random-task-button:hover {
        background: #1e6bb8;
    }

    /* Overlay Background */
    #overlay {
        display: none; /* Hidden by default */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7); /* Dark overlay */
        z-index: 999; /* Just below the popup */
    }
</style>

<div class="container">
    <div id="task-manager-container">
        <!-- Create Task Section -->
        <h2>Create a Task</h2>
        <label for="title-input">Task:</label>
        <input type="text" id="title-input" placeholder="e.g., Study math" />
        <button id="add-task-button">Add Task</button>

        <div id="error-message"></div>

        <!-- Task List -->
        <div id="tasks-container">
            <h2>Your Tasks</h2>
            <table id="task-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="task-list"></tbody>
            </table>
        </div>
    </div>
</div>

<!-- Edit Task Section -->
<div class="container">
    <div id="edit-task-container">
        <h2>Edit Task</h2>
        <label for="edit-title-input">Task:</label>
        <input type="text" id="edit-title-input" />
        <button id="update-task-button">Update Task</button>
    </div>
</div>

<!-- Random Task Section -->
<div class="container">
    <div id="random-task-container">
        <h2>Get a Random Task Idea</h2>
        
        <!-- Category selection dropdown -->
        <label for="category-select">Select Category:</label>
        <select id="category-select">
            <option value="">--Select a Category--</option>
            <option value="Big Idea 1 - Creative Development">Big Idea 1 - Creative Development</option>
            <option value="Big Idea 1 - Algorithms and Programming">Big Idea 1 - Algorithms and Programming</option>
            <option value="Big Idea 1 - Data and Analysis">Big Idea 1 - Data and Analysis</option>
        </select>

        <div id="random-task-box">
            Click the button to get a random task!
        </div>
        <button id="random-task-button">Get Random Task</button>
    </div>
</div>

<!-- Overlay -->
<div id="overlay"></div>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const titleInput = document.getElementById("title-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");
    const errorMessage = document.getElementById("error-message");

    // Edit elements
    const editTaskContainer = document.getElementById("edit-task-container");
    const editTitleInput = document.getElementById("edit-title-input");
    const updateTaskButton = document.getElementById("update-task-button");
    const overlay = document.getElementById("overlay");
    let editingTaskId = null;

    // Fetch and render tasks
    async function renderTasks() {
        try {
            const response = await fetch(`${pythonURI}/api/tasks`);
            const tasks = await response.json();
            taskList.innerHTML = "";

            tasks.forEach((task) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${task.task}</td>
                    <td>
                        <button class="edit-btn" onclick="editTask(${task.id}, '${task.task}')">Edit</button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </td>
                `;
                taskList.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    // Delete task
    window.deleteTask = async (taskId) => {
        await fetch(`http://127.0.0.1:8887/api/tasks/${taskId}`, { method: "DELETE" });
        renderTasks();
    };

    // Add new task
    addTaskButton.addEventListener("click", async () => {
        const taskTitle = titleInput.value.trim();
        if (taskTitle) {
            const res = await fetch("http://127.0.0.1:8887/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task: taskTitle }),
            });

            if (res.ok) {
                titleInput.value = "";
                renderTasks();
            } else {
                errorMessage.textContent = "Failed to add task.";
            }
        }
    });

    // Edit task
    window.editTask = (taskId, taskTitle) => {
        editingTaskId = taskId;
        editTaskContainer.style.display = "block";
        overlay.style.display = "block";
        editTitleInput.value = taskTitle;
    };

    // Update task
    updateTaskButton.addEventListener("click", async () => {
        const updatedTaskTitle = editTitleInput.value.trim();
        if (updatedTaskTitle && editingTaskId) {
            await fetch(`http://127.0.0.1:8887/api/tasks/${editingTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task: updatedTaskTitle }),
            });

            editTaskContainer.style.display = "none";
            overlay.style.display = "none";
            editingTaskId = null;
            renderTasks();
        }
    });

    // Close edit task
    overlay.addEventListener("click", () => {
        editTaskContainer.style.display = "none";
        overlay.style.display = "none";
        editingTaskId = null;
    });

    // Random task
    document.getElementById("random-task-button").addEventListener("click", async () => {
        const selectedCategory = document.getElementById("category-select").value;
        let url = "http://127.0.0.1:8887/api/random-tasks";
        if (selectedCategory) {
            url += `?category=${encodeURIComponent(selectedCategory)}`;
        }

        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.task) {
                document.getElementById("random-task-box").textContent = data.task;
            } else {
                document.getElementById("random-task-box").textContent = "No task found.";
            }
        } catch (error) {
            document.getElementById("random-task-box").textContent = "Error fetching task.";
        }
    });

    // Initialize
    renderTasks();
});
</script>

