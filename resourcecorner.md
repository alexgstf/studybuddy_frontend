---
layout: base
title: Resource Corner
permalink: /resource_corner
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


<div id="resource-corner-container">
  <h2>Resource Corner</h2>
  
  <!-- File Upload Section -->
  <label for="file-upload">Upload a File:</label>
  <input type="file" id="file-upload" />
  <button id="upload-file-button">Upload File</button>

  <!-- Notes Section -->
  <label for="note-input">Add a Note:</label>
  <textarea id="note-input" placeholder="Write your note here..."></textarea>
  <button id="add-note-button">Add Note</button>

  <!-- Resource Table -->
  <div id="resources-container" style="display:none;">
    <h3>Your Resources</h3>
    <table id="resource-table">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="resource-list"></tbody>
    </table>
    <button id="clear-resources-button" style="display:none;">Clear All Resources</button>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const fileUpload = document.getElementById("file-upload");
  const uploadFileButton = document.getElementById("upload-file-button");
  const noteInput = document.getElementById("note-input");
  const addNoteButton = document.getElementById("add-note-button");
  const resourcesContainer = document.getElementById("resources-container");
  const resourceList = document.getElementById("resource-list");
  const clearResourcesButton = document.getElementById("clear-resources-button");

  let resources = JSON.parse(localStorage.getItem("resources")) || []; // Load resources from local storage if available

  // Update the resource list
  function updateResourceList() {
    resourceList.innerHTML = ""; // Clear the current list

    resources.forEach((resource, index) => {
      const resourceRow = document.createElement("tr");

      const fileNameCell = document.createElement("td");
      fileNameCell.textContent = resource.fileName;
      resourceRow.appendChild(fileNameCell);

      const noteCell = document.createElement("td");
      noteCell.textContent = resource.note || "No note added";
      resourceRow.appendChild(noteCell);

      const actionsCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteResource(index);
      actionsCell.appendChild(deleteButton);
      resourceRow.appendChild(actionsCell);

      resourceList.appendChild(resourceRow);
    });

    // Show resources container and clear button if there are resources
    if (resources.length > 0) {
      resourcesContainer.style.display = "block";
      clearResourcesButton.style.display = "block";
    } else {
      resourcesContainer.style.display = "none";
      clearResourcesButton.style.display = "none";
    }
  }

  // Upload a file
  uploadFileButton.addEventListener("click", () => {
    const file = fileUpload.files[0];
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const fileName = file.name;
    const resource = {
      fileName: fileName,
      note: "",
    };

    // Add resource to the list
    resources.push(resource);

    // Save resources to local storage
    localStorage.setItem("resources", JSON.stringify(resources));

    // Update the resource list
    updateResourceList();
  });

  // Add a note
  addNoteButton.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (!noteText) {
      alert("Please enter a note!");
      return;
    }

    // Add note to the last uploaded file
    if (resources.length > 0) {
      resources[resources.length - 1].note = noteText;
      noteInput.value = ""; // Clear the input field

      // Save resources to local storage
      localStorage.setItem("resources", JSON.stringify(resources));

      // Update the resource list
      updateResourceList();
    } else {
      alert("Please upload a file first!");
    }
  });

  // Delete a resource
  function deleteResource(index) {
    resources.splice(index, 1); // Remove the resource from the array
    localStorage.setItem("resources", JSON.stringify(resources)); // Save updated resources to local storage

    // Update the resource list
    updateResourceList();
  }

  // Clear all resources
  clearResourcesButton.addEventListener("click", () => {
    resources.length = 0; // Clear the resources array
    localStorage.setItem("resources", JSON.stringify(resources)); // Save updated resources to local storage

    // Update the resource list
    updateResourceList();
  });

  // Initialize the resource list from local storage
  updateResourceList();
});
</script>

