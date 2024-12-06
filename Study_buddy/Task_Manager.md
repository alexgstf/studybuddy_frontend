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
</style>

<div id="task-manager-container">
  <label for="title-input">Task Title:</label>
  <input type="text" id="title-input" placeholder="e.g., Study math" />

  <label for="time-input">Time to be Taken:</label>
  <input type="text" id="time-input" placeholder="e.g., 2 hours" />

  <label for="class-input">Class:</label>
  <input type="text" id="class-input" placeholder="e.g., Math" />

  <label for="date-input">Date to be Completed:</label>
  <input type="date" id="date-input" />

  <button id="add-task-button">Add Task</button>

  <div id="tasks-container" style="display:none;">
    <h2>Your Tasks</h2>
    <table id="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Time to be Taken</th>
          <th>Class</th>
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
  const timeInput = document.getElementById("time-input");
  const classInput = document.getElementById("class-input");
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

      const timeCell = document.createElement("td");
      timeCell.textContent = task.time;
      taskRow.appendChild(timeCell);

      const classCell = document.createElement("td");
      classCell.textContent = task.class;
      taskRow.appendChild(classCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = task.date;
      taskRow.appendChild(dateCell);

      const actionsCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteTask(index);
      actionsCell.appendChild(deleteButton);
      taskRow.appendChild(actionsCell);

      taskList.appendChild(taskRow);
    });

    // Show tasks container and clear button if there are tasks
    if (tasks.length > 0) {
      tasksContainer.style.display = "block";
      clearTasksButton.style.display = "block";
    } else {
      tasksContainer.style.display = "none";
      clearTasksButton.style.display = "none";
    }
  }

  // Add a new task
  addTaskButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const time = timeInput.value.trim();
    const className = classInput.value.trim();
    const date = dateInput.value.trim();

    if (!title || !time || !className || !date) {
      alert("Please fill in all fields!");
      return;
    }

    const task = {
      title: title,
      time: time,
      class: className,
      date: date,
    };

    tasks.push(task);
    titleInput.value = "";
    timeInput.value = "";
    classInput.value = "";
    dateInput.value = ""; // Clear the input fields

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Update the task list
    updateTaskList();
  });

  // Delete a task
  function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task from the array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks to local storage

    // Update the task list
    updateTaskList();
  }

  // Clear all tasks
  clearTasksButton.addEventListener("click", () => {
    tasks.length = 0; // Clear the tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks to local storage

    // Update the task list
    updateTaskList();
  });

  // Initialize the task list from local storage
  updateTaskList();
});
</script>

