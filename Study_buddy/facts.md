---
layout: base
title: Insights
permalink: /factsbase
---

<h3 style="text-align: center;">Post Your Insights!</h3>

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

/* Styling for the Facts Cards */
#facts-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.fact-card {
    background: #222;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
    max-width: 400px;
    width: 100%;
}

.fact-card h4 {
    color: #fff;
    margin-bottom: 8px;
}

.fact-card p {
    color: #ddd;
    margin-bottom: 12px;
}

.fact-card .actions {
    display: flex;
    justify-content: space-between;
}

.fact-card button {
    background: #6b78f7;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.fact-card button:hover {
    background: #4c5ae1;
}

/* Responsive Design */
@media (max-width: 768px) {
    main {
        flex-direction: column; /* Stack form and cards vertically */
    }

    form {
        width: 100%;
    }
}
</style>

## 🌟 Community Guidelines for StudyBuddy 🌟



---

### 🔹 1. Respect Others
✔ Be kind and respectful to all members.  
✔ No bullying, harassment, or discrimination.  

---

### 🔹 2. Appropriate Content
✔ Keep posts **educational** and **relevant**.  
✔ No offensive or sensitive content.  

---

### 🔹 3. Academic Integrity
✔ No plagiarism or misrepresentation of work.  

---

Thank you for contributing to a **positive learning environment**! ✅



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
