---
layout: base
title: Facts
permalink: /insightsbase
---

<h3 style="text-align: center;">Post Your Insights!</h3>

### **Simple Posting Guidelines**  

1. **Be Respectful** – No hate speech, bullying, or offensive content.  
2. **Stay on Topic** – Keep posts relevant to the discussion.  
3. **No Spam** – Avoid excessive posting, ads, or self-promotion.  
4. **Fact-Check First** – Share accurate information; avoid spreading misinformation.  
5. **Respect Privacy** – Don't share personal or sensitive information.  
6. **Use Clear Language** – Keep it readable and understandable for everyone.  
7. **Follow Community Rules** – Abide by any specific guidelines set by the platform.  

Keep it positive and constructive! 🚀


<style>
/* General Styling */
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    background: #121826; /* Dark navy background */
}

/* Form Styling */
form {
    background: #1a2136; /* Deep navy */
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
    max-width: 400px;
    width: 100%;
    margin-bottom: 20px;
}

form label {
    font-weight: 600;
    font-size: 16px;
    color: #b0b8d9; /* Soft gray-blue */
    margin-bottom: 6px;
    display: block;
}

form textarea,
form input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 14px;
    border: none;
    border-radius: 8px;
    background: #252d44; /* Softer dark blue */
    color: #fff;
    font-size: 14px;
    transition: border 0.3s ease;
}

form textarea:focus,
form input[type="text"]:focus {
    border: 2px solid #7986ff;
    outline: none;
}

/* Unified Button Styling */
button {
    background: linear-gradient(45deg, #6b78f7, #4c5ae1);
    border: none;
    padding: 10px 14px;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
    background: linear-gradient(45deg, #4c5ae1, #5e63b8);
    transform: scale(1.05);
}

/* Facts List Styling */
#facts-container {
    width: 100%;
    max-width: 600px;
    background: #1a2136;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
}

.fact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #252d44; /* Separator line */
}

.fact-item:nth-child(odd) {
    background: #252d44; /* Alternating row colors */
}

.fact-item:nth-child(even) {
    background: #1a2136;
}

/* Bigger text for better readability */
.fact-item h4 {
    color: #d0d7ff; /* Soft pastel blue */
    font-size: 18px; /* Increased size */
    font-weight: 600;
    margin-bottom: 4px;
}

.fact-item p {
    color: #b0b8d9;
    font-size: 15px; /* Increased size */
    margin-bottom: 0;
    line-height: 1.4;
}

/* Actions */
.fact-item .actions {
    display: flex;
    gap: 4px; /* Reduce spacing between buttons */
}

/* Even Smaller Edit & Delete Buttons */
.fact-item button {
    padding: 4px 8px;  /* Smaller padding */
    font-size: 12px;  /* Smaller font size */
    border-radius: 5px; /* Slightly sharper edges */
}

.fact-item button:hover {
    transform: scale(1.03);
}

/* Responsive Design */
@media (max-width: 768px) {
    main {
        width: 100%;
        padding: 12px;
    }

    form {
        max-width: 100%;
    }

    #facts-container {
        max-width: 100%;
    }

    .fact-item {
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
    }

    .fact-item .actions {
        margin-top: 6px;
    }
}






</style>

<main>
    <section id="fact-form">
        <form id="add-fact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="fact">Insight:</label>
            <textarea id="fact" name="fact" required></textarea>
            <button type="submit">Add Insight</button>
        </form>
    </section>
    <section id="facts-container">
        <!-- Facts will be dynamically added here -->
    </section>
</main>

<script type="module">
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";
    async function checkAuthorization() {
        try {
            const response = await fetch(`${pythonURI}/api/id`, fetchOptions);

            if (response.status === 401) {
                window.location.href = "{{site.baseurl}}/login";
            }
        } catch (error) {
            console.error("Authorization check failed:", error);
            window.location.href = "{{site.baseurl}}/login";
        }
    }

    checkAuthorization();

    const API_URL = 'https://studybuddy.stu.nighthawkcodingsociety.com/api/userfacts';
    document.addEventListener('DOMContentLoaded', init);

    async function fetchFacts() {
        const response = await fetch(API_URL);
        const facts = await response.json();
        const factsContainer = document.getElementById('facts-container');
        factsContainer.innerHTML = '';
        facts.forEach((fact) => {
            const card = document.createElement('div');
            card.classList.add('fact-card');
            card.innerHTML = `
                <h4>${fact.name}</h4>
                <p>${fact.fact}</p>
                <div class="actions">
                    <button class="edit-button" data-id="${fact.id}" data-name="${fact.name}" data-fact="${fact.fact}">Edit</button>
                    <button class="delete-button" data-id="${fact.id}">Delete</button>
                </div>
            `;
            factsContainer.appendChild(card);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (e) => {
                deleteFact(e.target.dataset.id);
            });
        });
    }

    async function addFact(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const fact = document.getElementById('fact').value;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, fact })
        });
        if (response.ok) {
            alert('Fact added successfully!');
            fetchFacts();
            document.getElementById('add-fact-form').reset();
        }
    }

    async function deleteFact(id) {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Fact deleted successfully!');
            fetchFacts();
        }
    }

    function init() {
        document.getElementById('add-fact-form').addEventListener('submit', addFact);
        fetchFacts();
    }
</script>
