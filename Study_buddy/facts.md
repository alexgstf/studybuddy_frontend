---
layout: base
title: Facts
permalink: /factsbase
---

<style>
    /* General Styling for Forms */
    form {
        background: #000; /* Black card background */
        padding: 12px; /* Reduced padding */
        border-radius: 8px; /* Smaller border radius */
        box-shadow: 0px 3px 6px rgba(66, 103, 121, 0.3); /* Lighter shadow */
        margin-bottom: 16px; /* Reduced margin */
        max-width: 500px; /* Limit card width */
        margin-left: auto; /* Center alignment */
        margin-right: auto; /* Center alignment */
        color: #fff; /* White text for contrast */
    }

    label {
        display: block;
        margin-bottom: 6px; /* Reduced margin */
        font-weight: 500; /* Slightly lighter font weight */
        color: #ddd; /* Softer white for labels */
        font-size: 14px; /* Smaller label text size */
    }

    input[type="text"],
    textarea {
        width: 100%;
        padding: 8px; /* Reduced padding */
        margin-bottom: 12px; /* Reduced margin */
        border: 1px solid #444; /* Softer border color */
        border-radius: 6px; /* Smaller radius */
        background: #222; /* Dark gray input background */
        font-size: 14px; /* Reduced font size */
        color: #fff; /* White font for readability */
        transition: all 0.3s ease;
    }

    input[type="text"]::placeholder,
    textarea::placeholder {
        color: rgba(255, 255, 255, 0.6); /* Lighter placeholder text */
    }

    input[type="text"]:focus,
    textarea:focus {
        border-color: #5e63b8; /* Subtle focus border color */
        box-shadow: 0px 0px 6px rgba(76, 90, 225, 0.4); /* Reduced shadow intensity */
        outline: none;
    }

    button {
        background: linear-gradient(45deg, #6b78f7, #4c5ae1); /* Gradient button */
        border: none;
        color: #fff; /* White text */
        font-weight: bold;
        padding: 8px 12px; /* Reduced button size */
        border-radius: 6px; /* Smaller radius */
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover {
        background: linear-gradient(45deg, #4c5ae1, #5e63b8); /* Adjusted hover colors */
    }

    /* Table Styling */
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 16px; /* Reduced margin */
        background: #000; /* Black table background */
        border-radius: 10px; /* Slightly smaller radius */
        overflow: hidden;
        box-shadow: 0px 3px 6px rgba(66, 103, 121, 0.3); /* Lighter shadow */
        color: #fff; /* White text */
    }

    th,
    td {
        padding: 12px; /* Reduced padding */
        text-align: left;
        font-size: 14px; /* Smaller font size */
        color: #fff; /* White text for contrast */
        border-bottom: 1px solid #444; /* Subtle border */
    }

    th {
        background: linear-gradient(45deg, #6b78f7, #4c5ae1); /* Gradient for headers */
        color: #fff; /* White text */
        text-transform: uppercase;
    }

    tr:nth-child(even) {
        background: #222; /* Darker alternate row background */
    }

    tr:hover {
        background: #333; /* Slightly lighter hover effect */
    }

    td:last-child {
        text-align: center;
    }

    button {
        padding: 8px 12px; /* Reduced button padding */
    }

    button:hover {
        filter: brightness(1.1);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        th,
        td {
            padding: 10px; /* Reduced padding for smaller screens */
            font-size: 12px; /* Smaller font size */
        }

        input[type="text"],
        textarea {
            font-size: 12px; /* Adjusted font size */
        }

        button {
            padding: 8px; /* Smaller button padding */
        }

        form {
            max-width: 90%; /* Adjust form size for smaller screens */
        }
    }
</style>




<h1>Facts Manager</h1>

<main>
    <section id="fact-form">
        <h2>Add a New Fact</h2>
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

<script>
    const API_URL = 'http://localhost:8887/api/userfacts';
        // Fetch and display quotes
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
                    <button onclick="editFact(${fact.id}, '${fact.name}', '${fact.fact}')">Edit</button>
                    <button onclick="deleteFact(${fact.id})">Delete</button>
                </td>
            `;
            factsBody.appendChild(row);
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
