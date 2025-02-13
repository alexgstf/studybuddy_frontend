---
layout: base
title: Facts
permalink: /factsbase
---


<h3 style="text-align: center;">Post Your Facts!</h3>


<style>
/* General Styling for Posting Layout */
main {
    display: flex;
    flex-wrap: wrap; /* Allow wrapping for smaller screens */
    gap: 20px;
    justify-content: center; /* Center content horizontally */
    align-items: flex-start; /* Align items at the top */
}

form {
    background: #222; /* Dark gray card */
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 500px;
    flex: 1; /* Allow the form to grow/shrink within the layout */
}

form label {
    display: block;
    font-weight: bold;
    font-size: 14px;
    color: #ccc;
    margin-bottom: 6px;
}

form textarea,
form input[type="text"] {
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: none;
    border-radius: 8px;
    background: #333;
    color: #fff;
    font-size: 14px;
    resize: none;
    transition: border 0.3s ease;
}

form textarea:focus,
form input[type="text"]:focus {
    border: 2px solid #6b78f7;
    outline: none;
}

form button {
    width: 100%;
    background: linear-gradient(45deg, #6b78f7, #4c5ae1);
    border: none;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
}

form button:hover {
    background: linear-gradient(45deg, #4c5ae1, #5e63b8);
}

/* Styling for the Table */
section#fact-table {
    flex: 1; /* Allow the table section to grow/shrink within the layout */
    max-width: 500px;
    background: #222;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
    overflow-x: auto; /* Add horizontal scrolling for smaller screens */
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background: #333;
}

thead th {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    padding: 10px;
    text-align: left;
    border-bottom: 2px solid #6b78f7;
}

tbody td {
    font-size: 14px;
    color: #ddd;
    padding: 10px;
    border-bottom: 1px solid #444;
}

tbody tr:hover {
    background: #333;
}

tbody button {
    background: #6b78f7;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
}

tbody button:hover {
    background: #4c5ae1;
}

/* Responsive Design */
@media (max-width: 768px) {
    main {
        flex-direction: column; /* Stack form and table vertically */
    }

    form,
    section#fact-table {
        width: 100%;
    }
}
</style>


<main>
    <section id="fact-form">
        <form id="add-fact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="fact">Fact:</label>
            <textarea id="fact" name="fact" required></textarea>
            <button type="submit">Add Fact</button>
        </form>
    </section>
    <section id="fact-edit-form" style="display: none;">
        <h2>Edit Fact</h2>
        <form id="edit-fact-form">
            <label for="edit-name">Name:</label>
            <input type="text" id="edit-name" name="name" required>
            <label for="edit-fact">Fact:</label>
            <textarea id="edit-fact" name="fact" required></textarea>
            <button type="submit">Update Fact</button>
            <button type="button" onclick="cancelEdit()">Cancel</button>
        </form>
    </section>
    <section id="fact-table">
        <h2>All Facts</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Fact</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="facts-body">
                <!-- Facts will be dynamically added here -->
            </tbody>
        </table>
    </section>
</main>

<script type ="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";
    async function checkAuthorization() {
        try {
            const response = await fetch(`${pythonURI}/api/id`, fetchOptions);

            if (response.status === 401) {
                window.location.href = "{{site.baseurl}}/login";
            } else if (response.ok) {
                const contentElements = document.querySelectorAll('.content');
                contentElements.forEach(element => {
                    element.style.display = "block";
                });
            }
        } catch (error) {
            console.error("Authorization check failed:", error);
            window.location.href = "{{site.baseurl}}/login";
        }
    }

    checkAuthorization();

    const API_URL = 'https://studybuddy.stu.nighthawkcodingsociety.com/api/userfacts';
        // Fetch and display quotes
    document.addEventListener('DOMContentLoaded', init);

    async function fetchFacts() {
        const response = await fetch(API_URL);
        const facts = await response.json();
        const factsBody = document.getElementById('facts-body');
        factsBody.innerHTML = '';
        facts.forEach((fact) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${fact.id}</td>
                <td>${fact.name}</td>
                <td>${fact.fact}</td>
                <td>
                    <button class="edit-button" data-id="${fact.id}" data-name="${fact.name}" data-fact="${fact.fact}">Edit</button>
                    <button class="delete-button" data-id="${fact.id}">Delete</button>
                </td>
            `;
            factsBody.appendChild(row);
        });

        // Add event listeners after facts are displayed
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const { id, name, fact } = e.target.dataset;
                editFact(id, name, fact);
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                deleteFact(id);
            });
        });
    }
    // Add a new quote
    async function addFact(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const fact = document.getElementById('fact').value;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, fact}),
        });
        if (response.ok) {
            alert('Fact added successfully!');
            fetchFacts();
            document.getElementById('add-fact-form').reset();
        } else {
            alert('Failed to add fact.');
        }
    }
    // Function to handle deleting a quote
    async function deleteFact(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
    if (response.ok) {
            alert('Fact deleted successfully!');
            fetchFacts();
        } else {
            alert('Fact to delete fact.');
        }
    }
    // Function to handle editing a quote
    function editFact(id, currentName, currentFact) {
        // Show the edit form
        document.getElementById('fact-edit-form').style.display = 'block';
        document.getElementById('fact-form').style.display = 'none'; // Hide the Add form
        // Pre-fill the form with existing quote data
        document.getElementById('edit-name').value = currentName;
        document.getElementById('edit-fact').value = currentFact;
        // Change form submission to update quote
        const form = document.getElementById('edit-fact-form');
        form.onsubmit = async function(event) {
            event.preventDefault();
            const name = document.getElementById('edit-name').value;
            const fact = document.getElementById('edit-fact').value;
            // Send PUT request for updating the quote
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, fact}),
            });
            if (response.ok) {
                alert('Fact updated successfully!');
                fetchFact();
                cancelEdit(); // Cancel the editing view
            } else {
                alert('Failed to update fact.');
            }
        };
    }
        // Cancel editing and reset to Add form
    function cancelEdit() {
        document.getElementById('fact-edit-form').style.display = 'none';
        document.getElementById('fact-form').style.display = 'block';
        document.getElementById('edit-fact-form').reset();
    }
        // Initialize the app
    function init() {
        document.getElementById('add-fact-form').addEventListener('submit', addFact);
        fetchFacts();
    }
    document.addEventListener('DOMContentLoaded', init);
</script>
