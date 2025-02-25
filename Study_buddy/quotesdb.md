---
layout: base
title: Notes
permalink: /notesdatabase
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

    /* Quote Box Styling */
    .quote-box {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 15px;
    }

    .quote-card {
        width: 300px;
        background: #fff;
        border-radius: 12px;
        padding: 15px;
        box-shadow: 0px 4px 8px rgba(66, 103, 121, 0.51);
        transition: all 0.3s ease;
        cursor: pointer;
        overflow: hidden;
        text-align: left;
    }

    .quote-card:hover {
        box-shadow: 0px 4px 12px rgba(92, 81, 225, 0.6);
    }

    .quote-card h3 {
        margin: 0;
        font-size: 18px;
        color: #4a4a4a;
        font-weight: 600;
    }

    .quote-card p {
        display: none;
        font-size: 16px;
        color: #4a4a4a;
        margin-top: 10px;
    }

    .quote-card span {
        display: block;
        font-size: 14px;
        color: #888;
        margin-top: 10px;
    }

    .quote-card.active p {
        display: block;
    }

    /* Edit and Delete buttons for each quote */
    .quote-card .actions {
        margin-top: 15px;
        text-align: right;
    }

    .quote-card .actions button {
        background: #7a4cf7;
        border: none;
        color: #fff;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .quote-card .actions button:hover {
        background: #5c51e1;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .quote-card {
            width: 100%;
        }
    }

    /* Search Bar Styling */
    .search-bar {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
    }

    .search-bar input {
        width: 60%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #ddd;
        font-size: 16px;
    }
</style>

<h1>Notes Manager</h1>

<main>


    <section id="quote-form">
        <h2>Add Notes</h2>
        <form id="add-quote-form">
            <label for="author">Title:</label>
            <input type="text" id="author" name="author" required>
            <label for="quote">Content:</label>
            <textarea id="quote" name="quote" required></textarea>
            <label for="date">Subject:</label>
            <input type="text" id="date" name="date" placeholder="..." required>
            <button type="submit">Add Notes</button>
        </form>
    </section>

    <section id="quote-edit-form" style="display: none;">
        <h2>Edit Notes</h2>
        <form id="edit-quote-form">
            <label for="edit-author">Title:</label>
            <input type="text" id="edit-author" name="author" required>
            <label for="edit-quote">Content:</label>
            <textarea id="edit-quote" name="quote" required></textarea>
            <label for="edit-date">Subject:</label>
            <input type="text" id="edit-date" name="date" placeholder="..." required>
            <button type="submit">Update Notes</button>
            <button type="button" onclick="cancelEdit()">Cancel</button>
        </form>
    </section>

    <section id="search-bar" class="search-bar">
        <input type="text" id="search-input" placeholder="Search Notes..." />
    </section>

    <section id="quote-box">
        <h2>All Notes</h2>
        <div id="quotes-body" class="quote-box">
            <!-- Quotes will be dynamically added here -->
        </div>
    </section>
</main>

<script type ="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

    const API_URL = 'https://studybuddy.stu.nighthawkcodingsociety.com/api/userquotes';

    // Fetch and display quotes
    document.addEventListener('DOMContentLoaded', init);
    async function fetchQuotes() {
        const response = await fetch(API_URL);
        const quotes = await response.json();
        const quotesBody = document.getElementById('quotes-body');
        quotesBody.innerHTML = '';
        quotes.forEach((quote) => {
            const card = document.createElement('div');
            card.classList.add('quote-card');
            card.innerHTML = `
                <h3>${quote.author}</h3>
                <p>${quote.quote}</p>
                <span>${quote.date}</span>
                <div class="actions">
                    <button class="copy-button" data-quote="${quote.quote}">Copy</button>
                    <button class="edit-button" data-id="${quote.id}" data-author="${quote.author}" data-quote="${quote.quote}" data-date="${quote.date}">Edit</button>
                    <button class="delete-button" data-id="${quote.id}">Delete</button>
                </div>
            `;
            card.addEventListener('click', () => {
                card.classList.toggle('active');
            });
            quotesBody.appendChild(card);
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
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const quoteContent = e.target.dataset.quote;
                navigator.clipboard.writeText(quoteContent);
                alert('Notes copied to clipboard!');
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
            alert('Notes added successfully!');
            fetchQuotes();
            document.getElementById('add-quote-form').reset();
        } else {
            alert('Failed to add notes.');
        }
    }

    // Function to handle deleting a quote
    async function deleteQuote(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('Notes deleted successfully!');
            fetchQuotes();
        } else {
            alert('Failed to delete notes.');
        }
    }

    // Function to handle editing a quote
    function editQuote(id, currentAuthor, currentQuote, currentDate) {
        document.getElementById('quote-edit-form').style.display = 'block';
        document.getElementById('quote-form').style.display = 'none'; // Hide the Add form

        document.getElementById('edit-author').placeholder = currentAuthor;
        document.getElementById('edit-quote').placeholder = currentQuote;
        document.getElementById('edit-date').placeholder = currentDate;

        document.getElementById('edit-author').value = "";
        document.getElementById('edit-quote').value = "";
        document.getElementById('edit-date').value = "";

        const form = document.getElementById('edit-quote-form');
        form.onsubmit = async function(event) {
            event.preventDefault();
            const author = document.getElementById('edit-author').value || currentAuthor;
            const quote = document.getElementById('edit-quote').value || currentQuote;
            const date = document.getElementById('edit-date').value || currentDate;

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author, quote, date }),
            });

            if (response.ok) {
                alert('Notes updated successfully!');
                fetchQuotes();
                cancelEdit();
            } else {
                alert('Failed to update notes.');
            }
        };
    }

    window.cancelEdit = function cancelEdit() {
        const editForm = document.getElementById('quote-edit-form');
        const addForm = document.getElementById('quote-form');

        if (editForm && addForm) {
            editForm.style.display = 'none';
            addForm.style.display = 'block';
        }

        const editQuoteForm = document.getElementById('edit-quote-form');
        if (editQuoteForm) {
            editQuoteForm.reset();
        }
    };

    // Search functionality
    document.getElementById('search-input').addEventListener('input', function() {
        const searchQuery = this.value.toLowerCase();
        const allQuotes = document.querySelectorAll('.quote-card');
        allQuotes.forEach(quote => {
            const title = quote.querySelector('h3').textContent.toLowerCase();
            const content = quote.querySelector('p').textContent.toLowerCase();
            if (title.includes(searchQuery) || content.includes(searchQuery)) {
                quote.style.display = '';
            } else {
                quote.style.display = 'none';
            }
        });
    });

    function init() {
        document.getElementById('add-quote-form').addEventListener('submit', addQuote);
        fetchQuotes();
    }

    document.addEventListener('DOMContentLoaded', init);
</script>
