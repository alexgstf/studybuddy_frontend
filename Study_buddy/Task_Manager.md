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
        max-width: 600px; /* Reduced width for smaller container */
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        padding: 2rem;
        margin-top: 2rem;
        margin-bottom: 2rem; /* Added margin at the bottom for spacing */
        text-align: center; /* Centered the content */
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

    /* Calendar Section */
    #calendar-container {
        margin-top: 3rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 10px;
        justify-items: center;
        padding: 10px;
    }

    .calendar-day {
        width: 100%;
        height: 180px; /* Bigger boxes */
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        color: #fff;
        font-size: 1.5rem; /* Bigger text */
        position: relative;
        cursor: pointer;
        transition: background 0.3s ease;
        padding: 10px;
    }

    .calendar-day:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    .task-list {
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        padding: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        font-size: 0.9rem;
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
        width: 100%;
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
        width: 100%;
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
        width: 100%;
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
        background: rgba(0, 0, 0, 0.7);
        z-index: 999;
    }

    /* Overlay Content */
    #overlay-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 20px;
        border-radius: 15px;
        max-width: 600px;
        width: 100%;
        color: #fff;
        text-align: center;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    }

    .task-item {
        padding: 8px;
        background: rgba(255, 255, 255, 0.2);
        margin: 5px 0;
        border-radius: 8px;
        cursor: pointer;
    }

    .task-item:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    .task-actions {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        gap: 10px;
    }

    .task-actions button {
        padding: 0.5rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }

    .edit-btn {
        background-color: #2575fc;
        color: white;
    }

    .delete-btn {
        background-color: #e74c3c;
        color: white;
    }

    .save-btn {
        background-color: #2ecc71;
        color: white;
    }

    .cancel-btn {
        background-color: #f39c12;
        color: white;
    }

    /* Month Header Styles */
    #month-header {
        font-size: 2rem;
        color: #fff;
        margin-bottom: 1rem;
        text-align: center;
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
    </div>
</div>

<!-- Calendar Section -->
<div class="container">
    <div id="month-header"></div> <!-- Month header will be displayed here -->
    <div id="calendar-container">
        <!-- Calendar days will be dynamically generated here -->
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

<!-- Overlay to show the tasks for the clicked day -->
<div id="overlay">
    <div id="overlay-content">
        <h2>Tasks for Day</h2>
        <div id="task-list-for-day">
            <!-- Tasks for the selected day will appear here -->
        </div>
        <button id="close-overlay-button">Close</button>
    </div>
</div>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

document.addEventListener("DOMContentLoaded", () => {
    const titleInput = document.getElementById("title-input");
    const addTaskButton = document.getElementById("add-task-button");
    const errorMessage = document.getElementById("error-message");
    const calendarContainer = document.getElementById("calendar-container");
    const monthHeader = document.getElementById("month-header");
    const overlay = document.getElementById("overlay");
    const closeOverlayButton = document.getElementById("close-overlay-button");
    const taskListForDay = document.getElementById("task-list-for-day");

    // Function to generate calendar days
    function generateCalendarDays() {
        const daysInMonth = 31; // For February, you can dynamically change this.
        const monthName = new Date().toLocaleString('default', { month: 'long' });
        monthHeader.textContent = monthName; // Set the current month in the header

        calendarContainer.innerHTML = "";

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            dayElement.innerHTML = `
                <span>${i}</span>
            `;
            dayElement.addEventListener("click", () => showTasksForDay(i)); // Click handler
            calendarContainer.appendChild(dayElement);
        }
    }

    // Fetch and render tasks for the selected day
    async function fetchTasksForDay(day) {
        try {
            const response = await fetch(`${pythonURI}/api/tasks?day=${day}`);
            const tasks = await response.json();

            taskListForDay.innerHTML = ""; // Clear previous tasks
            if (tasks.length > 0) {
                tasks.forEach((task) => {
                    const taskItem = document.createElement("div");
                    taskItem.classList.add("task-item");
                    taskItem.textContent = task.task;
                    taskItem.setAttribute("data-id", task.id);
                    taskItem.addEventListener("click", () => showTaskOptions(task)); // Click handler for task item
                    taskListForDay.appendChild(taskItem);
                });
            } else {
                taskListForDay.innerHTML = "<p>No tasks for this day.</p>";
            }
        } catch (error) {
            taskListForDay.innerHTML = "<p>Error fetching tasks.</p>";
        }
    }

    // Show task options (edit/delete)
    function showTaskOptions(task) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <span>${task.task}</span>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id}, '${task.task}')">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskListForDay.innerHTML = ''; // Clear the task list and display the task with options
        taskListForDay.appendChild(taskItem);
    }

    // Edit task
    window.editTask = async function (taskId, currentText) {
        const newText = prompt("Edit task:", currentText);
        if (newText && newText !== currentText) {
            try {
                const res = await fetch(`${pythonURI}/api/tasks/${taskId}`, {
                    ...fetchOptions,
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ task: newText }),
                });

                const result = await res.json();
                if (res.ok) {
                    alert(result.message);
                    fetchTasksForDay(1); // Reload tasks for the selected day after update
                } else {
                    alert(`Failed to update task: ${result.error}`);
                }
            } catch (error) {
                alert("Error updating task.");
            }
        }
    }

    // Delete task
    window.deleteTask = async function (taskId) {
        const confirmation = confirm("Are you sure you want to delete this task?");
        if (confirmation) {
            try {
                const res = await fetch(`${pythonURI}/api/tasks/${taskId}`, {
                    ...fetchOptions,
                    method: "DELETE",
                });

                const result = await res.json();
                if (res.ok) {
                    alert(result.message);
                    fetchTasksForDay(1); // Reload tasks for the selected day after deletion
                } else {
                    alert(`Failed to delete task: ${result.error}`);
                }
            } catch (error) {
                alert("Error deleting task.");
            }
        }
    }

    // Add new task
    async function addTask(taskText) {
        if (!taskText.trim()) {
            errorMessage.textContent = "Please enter a task.";
            return;
        }

        try {
            const response = await fetch(`${pythonURI}/api/tasks`, {
                ...fetchOptions,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task: taskText })
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                titleInput.value = ''; // Clear input field after adding task
                fetchTasksForDay(1); // Reload tasks for the selected day after adding
            } else {
                alert(`Failed to add task: ${result.error}`);
            }
        } catch (error) {
            alert("Error adding task.");
        }
    }

    // Add task button click handler
    addTaskButton.addEventListener("click", () => {
        const taskText = titleInput.value;
        addTask(taskText);
    });

    // Show tasks for the clicked day and display overlay
    function showTasksForDay(day) {
        fetchTasksForDay(day);
        overlay.style.display = "block"; // Show the overlay
    }

    closeOverlayButton.addEventListener("click", () => {
        overlay.style.display = "none"; // Hide overlay when close button is clicked
    });

    // Initialize the calendar
    generateCalendarDays();
});
