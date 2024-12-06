---
layout: base
title: Quiz Zone
permalink: /quizzone
---

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Study Buddy</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
<style>
    body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #6a11cb, #2575fc);
        color: #fff;
        overflow-x: hidden;
    }

    header {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    header h1 {
        margin: 0;
        font-size: 2rem;
    }
    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1.5rem;
    }
    nav ul li a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease;
    }
    nav ul li a:hover {
        color: #ffd700;
    }
    .hero {
        text-align: center;
        padding: 5rem 1rem;
        background: linear-gradient(135deg, #2575fc, #6a11cb);
    }
    .hero h2 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    .hero p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
    .hero button {
        background: #ffd700;
        color: #000;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        border-radius: 50px;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    .hero button:hover {
        background: #ffc700;
    }
    .features {
        padding: 3rem 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
    .feature {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease;
    }
    .feature:hover {
        transform: translateY(-10px);
    }
    .feature h3 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }
    .feature p {
        font-size: 1rem;
    }
    footer {
        text-align: center;
        padding: 2rem 1rem;
        background: #000;
    }
    footer p {
        margin: 0;
        color: #fff;
    }
    footer a {
        color: #ffd700;
        text-decoration: none;
        font-weight: bold;
    }
    footer a:hover {
        text-decoration: underline;
    }
</style>

# Quiz Zone 🎓

Welcome to the Quiz Zone! Test your knowledge in one of the following subjects. Select a topic and take a quick 5-question quiz. Good luck!

<div id="quiz-container">
  <label for="subject-select">Choose a subject:</label>
  <select id="subject-select">
    <option value="">--Select a subject--</option>
    <option value="math">Math</option>
    <option value="science">Science</option>
    <option value="history">History</option>
  </select>
  <button id="start-quiz">Start Quiz</button>

  <div id="quiz" style="display:none;">
    <h2 id="quiz-title"></h2>
    <div id="questions-container"></div>
    <button id="submit-quiz" style="display:none;">Submit Quiz</button>
  </div>

  <div id="results" style="display:none;">
    <h2>Your Results</h2>
    <p id="score"></p>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const questions = {
    math: [
      { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], answer: "8" },
      { question: "What is 12 ÷ 4?", options: ["2", "3", "4", "5"], answer: "3" },
      { question: "What is the square root of 16?", options: ["2", "4", "6", "8"], answer: "4" },
      { question: "What is 7 x 6?", options: ["42", "36", "48", "56"], answer: "42" },
      { question: "What is 10 - 7?", options: ["1", "2", "3", "4"], answer: "3" },
    ],
    science: [
      { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
      { question: "What is H2O commonly known as?", options: ["Oxygen", "Water", "Hydrogen", "Salt"], answer: "Water" },
      { question: "What gas do plants absorb for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
      { question: "What is the center of an atom called?", options: ["Proton", "Electron", "Nucleus", "Neutron"], answer: "Nucleus" },
      { question: "What force keeps us on the ground?", options: ["Magnetism", "Friction", "Gravity", "Tension"], answer: "Gravity" },
    ],
    history: [
      { question: "Who was the first president of the United States?", options: ["George Washington", "Abraham Lincoln", "John Adams", "Thomas Jefferson"], answer: "George Washington" },
      { question: "In what year did World War II end?", options: ["1945", "1940", "1939", "1950"], answer: "1945" },
      { question: "Who wrote the Declaration of Independence?", options: ["Benjamin Franklin", "John Hancock", "Thomas Jefferson", "Alexander Hamilton"], answer: "Thomas Jefferson" },
      { question: "What was the name of the ship that carried the Pilgrims to America?", options: ["Santa Maria", "Mayflower", "Beagle", "Endeavour"], answer: "Mayflower" },
      { question: "Who was known as the 'Father of History'?", options: ["Plato", "Herodotus", "Aristotle", "Socrates"], answer: "Herodotus" },
    ],
  };

  const subjectSelect = document.getElementById("subject-select");
  const startQuizBtn = document.getElementById("start-quiz");
  const quizContainer = document.getElementById("quiz");
  const questionsContainer = document.getElementById("questions-container");
  const submitQuizBtn = document.getElementById("submit-quiz");
  const resultsContainer = document.getElementById("results");
  const scoreDisplay = document.getElementById("score");

  let currentSubject = "";
  let selectedQuestions = [];

  startQuizBtn.addEventListener("click", () => {
    currentSubject = subjectSelect.value;
    if (!currentSubject) {
      alert("Please select a subject to start the quiz!");
      return;
    }

    // Randomly select 10 questions (or fewer if less available)
    selectedQuestions = [...questions[currentSubject]].sort(() => 0.5 - Math.random()).slice(0, 10);

    // Display the quiz
    quizContainer.style.display = "block";
    document.getElementById("quiz-title").textContent = `Quiz on ${currentSubject}`;
    questionsContainer.innerHTML = "";

    selectedQuestions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");

      const questionText = document.createElement("p");
      questionText.textContent = `${index + 1}. ${q.question}`;
      questionDiv.appendChild(questionText);

      q.options.forEach((option) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${index}`;
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        questionDiv.appendChild(label);
        questionDiv.appendChild(document.createElement("br"));
      });

      questionsContainer.appendChild(questionDiv);
    });

    submitQuizBtn.style.display = "block";
    resultsContainer.style.display = "none";
  });

  submitQuizBtn.addEventListener("click", () => {
    let score = 0;

    selectedQuestions.forEach((q, index) => {
      const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
      if (selectedOption && selectedOption.value === q.answer) {
        score++;
      }
    });

    resultsContainer.style.display = "block";
    scoreDisplay.textContent = `You scored ${score} out of ${selectedQuestions.length}!`;

    // Reset quiz display
    quizContainer.style.display = "none";
    submitQuizBtn.style.display = "none";
  });
});
</script>
