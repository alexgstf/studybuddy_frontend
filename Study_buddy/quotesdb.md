---
layout: base
title: Quotes
permalink: /quotesdatabase
---

<style>
    /* General Styling for Forms */
    form {
        background: #fff;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0px 4px 8px rgba(66, 103, 121, 0.51);
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #4a4a4a;
    }

    input[type="text"],
    textarea {
        width: 100%;
        padding: 12px;
        margin-bottom: 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: linear-gradient(45deg, #7a4cf7, #5c51e1);
        font-size: 16px;
        color: #fff; /* Adjust font color for readability */
        transition: all 0.3s ease;
    }

    input[type="text"]::placeholder,
    textarea::placeholder {
        color: rgba(255, 255, 255, 0.8); /* Lighter placeholder text */
    }

    input[type="text"]:focus,
    textarea:focus {
        border-color: #6a61b9;
        box-shadow: 0px 0px 8px rgba(92, 81, 225, 0.4);
        outline: none;
    }

    button {
        background: linear-gradient(45deg, #7a4cf7, #5c51e1);
        border: none;
        color: #fff;
        font-weight: bold;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover {
        background: linear-gradient(45deg, #5c51e1, #6a61b9);
    }

    /* Table Styling */
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0px 4px 8px rgba(66, 103, 121, 0.51);
    }

    th,
    td {
        padding: 16px;
        text-align: left;
        font-size: 16px;
        color: #4a4a4a;
        border-bottom: 1px solid #f0f0f5;
    }

    th {
        background: linear-gradient(45deg, #7a4cf7, #3e3e9e);
        color: #fff;
        text-transform: uppercase;
    }

    tr:nth-child(even) {
        background: #f9f9fc;
    }

    tr:hover {
        background: #efefff;
    }

    td:last-child {
        text-align: center;
    }

    button {
        padding: 10px 14px;
    }

    button:hover {
        filter: brightness(1.1);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        th,
        td {
            padding: 12px;
            font-size: 14px;
        }

        input[type="text"],
        textarea {
            font-size: 14px;
        }

        button {
            padding: 10px;
        }
    }
</style>

<h1>Quotes Manager</h1>

<main>
    <section id="quote-form">
        <h2>Add a New Quote</h2>
        <form id="add-quote-form">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author" required>
            <label for="quote">Quote:</label>
            <textarea id="quote" name="quote" required></textarea>
            <label for="date">Date:</label>
            <input type="text" id="date" name="date" placeholder="YYYY" required>
            <button type="submit">Add Quote</button>
        </form>
    </section>
        <section id="quote-edit-form" style="display: none;">
        <h2>Edit Quote</h2>
        <form id="edit-quote-form">
            <label for="edit-author">Author:</label>
            <input type="text" id="edit-author" name="author" required>
            <label for="edit-quote">Quote:</label>
            <textarea id="edit-quote" name="quote" required></textarea>
            <label for="edit-date">Date:</label>
            <input type="text" id="edit-date" name="date" placeholder="YYYY" required>
            <button type="submit">Update Quote</button>
            <button type="button" onclick="cancelEdit()">Cancel</button>
        </form>
    </section>
    <section id="quote-table">
        <h2>All Quotes</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Author</th>
                    <th>Quote</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="quotes-body">
                <!-- Quotes will be dynamically added here -->
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
    const API_URL = 'https://studybuddy.stu.nighthawkcodingsociety.com/api/userquotes';
    // Fetch and display quotes
    document.addEventListener('DOMContentLoaded', init);
    async function fetchQuotes() {
        const response = await fetch(API_URL);
        const quotes = await response.json();
        const quotesBody = document.getElementById('quotes-body');
        quotesBody.innerHTML = '';
        quotes.forEach((quote) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${quote.id}</td>
                <td>${quote.author}</td>
                <td>${quote.quote}</td>
                <td>${quote.date}</td>
                <td>
                    <button class="edit-button" data-id="${quote.id}" data-author="${quote.author}" data-quote="${quote.quote}" data-date="${quote.date}">Edit</button>
                    <button class="delete-button" data-id="${quote.id}">Delete</button>
                </td>
            `;
            quotesBody.appendChild(row);
        });
        // Add event listeners after quotes are displayed
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const { id, author, quote, date } = e.target.dataset;
                editQuote(id, author, quote, date);
            });
        });
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                deleteQuote(id);
            });
        });
    }

    // Add a new quote
    async function addQuote(event) {
        event.preventDefault();
        const author = document.getElementById('author').value;
        const quote = document.getElementById('quote').value;
        const date = document.getElementById('date').value;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ author, quote, date }),
        });
        if (response.ok) {
            alert('Quote added successfully!');
            fetchQuotes();
            document.getElementById('add-quote-form').reset();
        } else {
            alert('Failed to add quote.');
        }
    }
    // Function to handle deleting a quote
    async function deleteQuote(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
    if (response.ok) {
            alert('Quote deleted successfully!');
            fetchQuotes();
        } else {
            alert('Failed to delete quote.');
        }
    }
    // Function to handle editing a quote
    function editQuote(id, currentAuthor, currentQuote, currentDate) {
        // Show the edit form
        document.getElementById('quote-edit-form').style.display = 'block';
        document.getElementById('quote-form').style.display = 'none'; // Hide the Add form

        // Correctly set placeholders
        document.getElementById('edit-author').placeholder = currentAuthor;
        document.getElementById('edit-quote').placeholder = currentQuote;
        document.getElementById('edit-date').placeholder = currentDate;

        // Reset values so users can type new ones
        document.getElementById('edit-author').value = "";
        document.getElementById('edit-quote').value = "";
        document.getElementById('edit-date').value = "";

        // Change form submission to update quote
        const form = document.getElementById('edit-quote-form');
        form.onsubmit = async function(event) {
            event.preventDefault();
            const author = document.getElementById('edit-author').value || currentAuthor;
            const quote = document.getElementById('edit-quote').value || currentQuote;
            const date = document.getElementById('edit-date').value || currentDate;

            // Send PUT request for updating the quote
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author, quote, date }),
            });

            if (response.ok) {
                alert('Quote updated successfully!');
                fetchQuotes();
                cancelEdit(); // Hide edit form after update
            } else {
                alert('Failed to update quote.');
            }
        };
    }
    window.cancelEdit = function cancelEdit() {
        console.log("Cancel button clicked!"); // Debugging

        const editForm = document.getElementById('quote-edit-form');
        const addForm = document.getElementById('quote-form');

        if (editForm && addForm) {
            editForm.style.display = 'none';
            addForm.style.display = 'block';
            console.log("Switched to Add Form"); // Debugging
        } else {
            console.error("Edit form or add form not found!");
        }

        const editQuoteForm = document.getElementById('edit-quote-form');
        if (editQuoteForm) {
            editQuoteForm.reset();
            console.log("Edit form reset"); // Debugging
        } else {
            console.error("Edit quote form not found!");
        }
    };
        // Initialize the app
    function init() {
        document.getElementById('add-quote-form').addEventListener('submit', addQuote);
        fetchQuotes();
    }
    document.addEventListener('DOMContentLoaded', init);
</script>