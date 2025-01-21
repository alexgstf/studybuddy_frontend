---
layout: base
title: Quotes
permalink: /quotesdatabase
---

<body>
    <header>
        <h1>Quotes Manager</h1>
    </header>
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
    <script>
        const API_URL = 'http://localhost:8887/api/userquotes';

        // Fetch and display quotes
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
                        <button onclick="editQuote(${quote.id}, '${quote.author}', '${quote.quote}', '${quote.date}')">Edit</button>
                        <button onclick="deleteQuote(${quote.id})">Delete</button>
                    </td>
                `;
                quotesBody.appendChild(row);
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
            // Pre-fill the form with existing quote data
            document.getElementById('author').value = currentAuthor;
            document.getElementById('quote').value = currentQuote;
            document.getElementById('date').value = currentDate;

            // Change form submission to update quote
            const form = document.getElementById('add-quote-form');
            form.onsubmit = async function(event) {
                event.preventDefault();

                const author = document.getElementById('author').value;
                const quote = document.getElementById('quote').value;
                const date = document.getElementById('date').value;

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
                    form.reset();
                } else {
                    alert('Failed to update quote.');
                }
            };
        }

        // Initialize the app
        function init() {
            document.getElementById('add-quote-form').addEventListener('submit', addQuote);
            fetchQuotes();
        }

        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
