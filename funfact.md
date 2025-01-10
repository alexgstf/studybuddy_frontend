---
layout: base
title: funfacttest
permalink: /fftest
---

<div>
  <h1>Fun Fact Generator</h1>
  <p>Click the button below to get a random fun fact!</p>
  <button id="fetch-fact">Get Fun Fact</button>
  <p id="fact">Your fun fact will appear here.</p>
</div>

<script>
  async function fetchRandomFact() {
    try {
      const response = await fetch('http://localhost:8887/api/funfacts/random');
      if (response.ok) {
        const data = await response.json();
        document.getElementById('fact').innerText = data.fact;
      } else {
        document.getElementById('fact').innerText =
          'Could not fetch a fun fact. Please try again later.';
        console.error('Failed to fetch fact');
      }
    } catch (error) {
      document.getElementById('fact').innerText =
        'Could not fetch a fun fact. Please try again later.';
      console.error('Error fetching fact:', error);
    }
  }

  document
    .getElementById('fetch-fact')
    .addEventListener('click', fetchRandomFact);
</script>
