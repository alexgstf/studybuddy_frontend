---
layout: base
title: Quotes
permalink: /quotes
---

<div>
    <p id="quote">Click the button to fetch a quote!</p>
    <p id="author"></p>
    <p id="date"></p>
    <button id="fetch-quote">Fetch a Quote</button>
    <button id="reveal-details" style="display: none;">Author and Date</button>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        console.log('JavaScript Loaded');

        const quoteElement = document.getElementById('quote');
        const authorElement = document.getElementById('author');
        const dateElement = document.getElementById('date');
        const fetchButton = document.getElementById('fetch-quote');
        const revealButton = document.getElementById('reveal-details');

        let currentQuote = null;

        async function fetchQuote() {
            console.log('Fetching quote...');
            try {
                const response = await fetch('http://localhost:8887/api/quotes/random');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                currentQuote = await response.json();
                console.log('Quote fetched:', currentQuote);

                // Update UI with the quote
                quoteElement.textContent = `"${currentQuote.quote}"`;
                authorElement.textContent = '';
                dateElement.textContent = '';
                revealButton.style.display = 'inline-block'; // Show the reveal button
            } catch (error) {
                console.error('Error fetching quote:', error);
                quoteElement.textContent = 'Could not fetch a quote. Please try again later.';
                authorElement.textContent = '';
                dateElement.textContent = '';
                revealButton.style.display = 'none'; // Hide the reveal button
            }
        }

        function revealDetails() {
            console.log('Revealing details...');
            if (currentQuote) {
                authorElement.textContent = `Author: ${currentQuote.author}`;
                dateElement.textContent = `Date: ${currentQuote.date}`;
            }
        }

        fetchButton.addEventListener('click', fetchQuote);
        revealButton.addEventListener('click', revealDetails);
    });
</script>
