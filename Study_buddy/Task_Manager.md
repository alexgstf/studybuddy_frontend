---
layout: base
title: Task Manager
permalink: /task_manager
---

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Study Buddy</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
<style>
    body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #6a11cb, #2575fc);
        color: #fff;
        overflow-x: hidden;
    }

    header {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    header h1 {
        margin: 0;
        font-size: 2rem;
    }

    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1.5rem;
    }

    nav ul li a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease;
    }

    nav ul li a:hover {
        color: #ffd700;
    }

    .hero {
        text-align: center;
        padding: 5rem 1rem;
        background: linear-gradient(135deg, #2575fc, #6a11cb);
    }

    .hero h2 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .hero p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }

    .hero button {
        background: #ffd700;
        color: #000;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        border-radius: 50px;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .hero button:hover {
        background: #ffc700;
    }

    .features {
        padding: 3rem 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .feature {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease;
    }

    .feature:hover {
        transform: translateY(-10px);
    }

    .feature h3 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    .feature p {
        font-size: 1rem;
    }

    footer {
        text-align: center;
        padding: 2rem 1rem;
        background: #000;
    }

    footer p {
        margin: 0;
        color: #fff;
    }

    footer a {
        color: #ffd700;
        text-decoration: none;
        font-weight: bold;
    }

    footer a:hover {
        text-decoration: underline;
    }

    #task-manager-container {
        margin: 2rem auto;
        max-width: 600px;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    #task-manager-container label {
        display: block;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    #task-manager-container input,
    #task-manager-container textarea {
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

    #task-manager-container input:focus,
    #task-manager-container textarea:focus {
        outline: none;
        border-color: #ffd700;
        box-shadow: 0 0 5px #ffd700;
    }

    #task-manager-container button {
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

    #task-manager-container button:hover {
        background: #ffc700;
    }

    #task-manager-container input, 
    #task-manager-container button {
        font-family: 'Poppins', sans-serif;
    }

    #tasks-container {
        display: none;
        margin-top: 2rem;
    }

    #tasks-container h2 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    #task-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }

    #task-table th, #task-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #fff;
    }

    #task-table th {
        font-weight: 600;
        background: #2575fc;
        color: #fff;
    }

    #task-table tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.05);
    }

    #task-table tr:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .delete-btn {
        background: #ff3b3b;
        color: #fff;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .delete-btn:hover {
        background: #e03e3e;
    }

    #clear-tasks-button {
        width: 100%;
        padding: 1rem;
        background: #ff3b3b;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 1.2rem;
        cursor: pointer;
        margin-top: 1rem;
        transition: background 0.3s ease;
    }

    #clear-tasks-button:hover {
        background: #e03e3e;
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

  <div id="tasks-container">
    <h2>Your Tasks</h2>
    <table id="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date to be Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="task-list"></tbody>
    </table>
    <button id="clear-tasks-button" style="display:none;">Clear All Tasks</button>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title-input");
  const descriptionInput = document.getElementById("description-input");
  const dateInput = document.getElementById("date-input");
  const addTaskButton = document.getElementById("add-task-button");
  const tasksContainer = document.getElementById("tasks-container");
  const taskList = document.getElementById("task-list");
  const clearTasksButton = document.getElementById("clear-tasks-button");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from local storage if available

  // Update the task list
  function updateTaskList() {
    taskList.innerHTML = ""; // Clear the current list

    tasks.forEach((task, index) => {
      const taskRow = document.createElement("tr");

      const titleCell = document.createElement("td");
      titleCell.textContent = task.title;
      taskRow.appendChild(titleCell);

      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = task.description;
      taskRow.appendChild(descriptionCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = task.date;
      taskRow.appendChild(dateCell);

      const actionsCell = document.createElement("td");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-btn");
      deleteButton.onclick = () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
        updateTaskList(); // Update the list
      };

      actionsCell.appendChild(deleteButton);
      taskRow.appendChild(actionsCell);
      taskList.appendChild(taskRow);
    });

    // Show "Clear All Tasks" button if there are tasks
    if (tasks.length > 0) {
      tasksContainer.style.display = "block";
      clearTasksButton.style.display = "block";
    } else {
      tasksContainer.style.display = "none";
      clearTasksButton.style.display = "none";
    }
  }

  // Add task
  addTaskButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const date = dateInput.value;

    if (title && description && date) {
      tasks.push({ title, description, date });
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to local storage
      updateTaskList();
      titleInput.value = "";
      descriptionInput.value = "";
      dateInput.value = "";
    } else {
      alert("Please fill out all fields.");
    }
  });

  // Clear all tasks
  clearTasksButton.addEventListener("click", () => {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Clear from local storage
    updateTaskList();
  });

  updateTaskList();
});
</script>