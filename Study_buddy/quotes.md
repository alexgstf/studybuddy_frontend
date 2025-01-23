---
layout: base
title: Quotes
permalink: /quotes
---

<div style="text-align: center; font-family: Arial, sans-serif; margin-top: 50px;">
    <h1 class="handwritten-title">Quote Generator</h1>
    <p id="quote" style="font-size: 1.5rem; color:rgb(255, 255, 255);">Click the button to find a quote!</p>
    <p id="author" style="font-size: 1rem; color:rgb(212, 212, 212);"></p>
    <p id="date" style="font-size: 1rem; color: rgb(212, 212, 212);"></p>
    <button id="fetch-quote" class="styled-button">Find Quote</button>
    <button id="reveal-details" class="styled-button" style="display: none;">Author and Date</button>
</div>

<style>
    .handwritten-title {
        font-size: 3rem;
        font-weight: bold;
        color:rgb(255, 255, 255);
        border-right: 4px solid #3e3e9e;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        width: 0;
        animation: handwriting 4s steps(30) 1s forwards, blink 0.75s step-end infinite;
    }
    @keyframes handwriting {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }
    @keyframes blink {
        50% {
            border-color: transparent;
        }
        100% {
            border-color: #3e3e9e;
        }
    }

    .styled-button {
        font-size: 1rem;
        font-weight: bold;
        color: white;
        background: linear-gradient(45deg, #7a4cf7, #5c51e1);
        border: 3px solid #3e3e9e;
        border-radius: 25px;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    .styled-button:hover {
        background: linear-gradient(45deg, #5c51e1, #7a4cf7);
        border-color: #6a61b9;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
        transform: scale(1.1);
    }

    .styled-button:active {
        background: #3e3e9e;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        transform: scale(0.95);
    }

    p {
        margin: 10px 0;
    }
</style>

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
