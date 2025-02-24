---
layout: base
title: Addition Quiz
permalink: /studybuddy/additionquiz
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subtraction Quiz</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif !important;
            margin: 0 !important;
            padding: 0 !important;
            background: linear-gradient(135deg, #6a11cb, #2575fc) !important;
            color: #fff !important;
            overflow-x: hidden !important;
        }

        header {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(10px) !important;
            padding: 1rem 2rem !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 1000 !important;
        }

        header h1 {
            margin: 0 !important;
            font-size: 2rem !important;
        }

        .back-home {
            display: inline-block !important;
            margin: 1rem auto !important;
            margin-right: 1% !important;
            padding: 0.8rem 2rem !important;
            font-size: 1rem !important;
            font-weight: bold !important;
            color: #fff !important;
            background: rgba(255, 255, 255, 0.2) !important;
            border: 1px solid #fff !important;
            border-radius: 8px !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
        }

        .back-home:hover {
            background: rgba(255, 255, 255, 0.35) !important;
            color: #000 !important;
            transform: scale(1.05) !important;
        }

        .quiz-container {
            max-width: 800px !important;
            margin: 2rem auto !important;
            background: rgba(255, 255, 255, 0.1) !important;
            padding: 2rem !important;
            border-radius: 10px !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
            text-align: center !important;
        }

        .question-number {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
        }

        .question {
            font-size: 1.2rem !important;
            margin-bottom: 1rem !important;
        }

        input[type="text"] {
            text-align: center !important;
            border: none !important;
            border-bottom: 2px solid #fff !important;
            background: none !important;
            color: #fff !important;
            font-size: 1rem !important;
            width: 80px !important;
            outline: none !important;
            padding: 5px 0 !important;
            margin-left: 10px !important;
            transition: border-bottom-color 0.2s !important;
        }

        input[type="text"]:focus {
            border-bottom-color: #90dfff !important;
        }

        .navigation-buttons {
            display: flex !important;
            justify-content: space-between !important;
            margin-top: 2rem !important;
        }

        .nav-btn {
            padding: 1rem 2rem !important;
            font-size: 1rem !important;
            font-weight: bold !important;
            color: #fff !important;
            background: #8bb6ff !important;
            border: none !important;
            border-radius: 5px !important;
            cursor: pointer !important;
            transition: background 0.3s ease !important;
        }

        .nav-btn:hover {
            background: #81ecff !important;
            color: #000 !important;
        }

        .nav-btn:disabled {
            background: rgba(255, 255, 255, 0.3) !important;
            cursor: not-allowed !important;
        }

        .progress-bar-container {
            position: relative !important;
            margin: 2rem auto !important;
            width: 80% !important;
            background: rgba(255, 255, 255, 0.1) !important;
            height: 30px !important;
            border-radius: 15px !important;
            overflow: hidden !important;
        }

        .progress-bar {
            height: 100% !important;
            transition: width 0.5s ease !important;
            background: #ffd700 !important;
            position: relative !important;
        }

        .progress-bar::after {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            right: 0 !important;
            width: 5px !important;
            height: 100% !important;
            background: #fff !important;
        }

        .progress-label {
            margin-top: 10px !important;
            font-size: 1.5rem !important;
            color: #fff !important;
            font-weight: bold !important;
        }

        .answer-feedback {
            margin-top: 2rem !important;
            text-align: left !important;
        }

        .feedback {
            padding: 0.8rem !important;
            border-radius: 8px !important;
            margin: 0.5rem 0 !important;
        }

        .correct {
            color: #0f5132 !important;
            background: #d1e7dd !important;
        }

        .incorrect {
            color: #664d03 !important;
            background: #fff3cd !important;
        }

        .refresh-btn {
            display: block !important;
            width: 100% !important;
            padding: 1rem !important;
            font-size: 1.2rem !important;
            font-weight: bold !important;
            color: #fff !important;
            background: #ff4b4b !important;
            border: none !important;
            border-radius: 5px !important;
            cursor: pointer !important;
            margin-top: 1rem !important;
            transition: background 0.3s ease !important;
        }

        .refresh-btn:hover {
            background: #ff7373 !important;
        }
        .xp-bar-container {
            position: relative !important;
            margin: 2rem auto !important;
            width: 80% !important;
            background: rgba(255, 255, 255, 0.1) !important;
            height: 30px !important;
            border-radius: 15px !important;
            overflow: hidden !important;
        }

        .xp-bar {
            height: 100% !important;
            transition: width 0.5s ease !important;
            background: linear-gradient(90deg, #1e90ff, #00bfff) !important; /* Blue gradient for XP bar */
            position: relative !important;
            border-radius: 15px !important;
        }

    </style>
</head>
<body>
    <header>
        <h1>Subtraction Quiz</h1>
        <a href="../quizhome.html" class="back-home">Back to Quiz Homepage</a>
    </header>

    <main>
        <div class="quiz-container">
            <div id="skibidibarthing" class="progress-bar-container">
                <div id="progress-bar" class="progress-bar" style="width: 0%;"></div>
            </div>
            <div id="question-container">
                <div class="question-number">Question 1/15</div>
                <div class="question" id="current-question"></div>
                <input type="text" id="answer-input" placeholder="?" required>
            </div>
            <div class="navigation-buttons">
                <button class="nav-btn" id="back-btn" onclick="prevQuestion()" disabled>Back</button>
                <button class="nav-btn" id="next-btn" onclick="nextQuestion()">Next</button>
            </div>
            <canvas id="confetti-canvas" style="position: absolute; top: 0; left: 0; z-index: 9999; pointer-events: none;"></canvas>
            <div id="results"></div>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/confetti-js@0.0.18/dist/index.min.js"></script>

    <script type="module">
        import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";
        document.addEventListener("DOMContentLoaded", () => {
            const storedName = localStorage.getItem("username") || "Guest";
            const questions = [];
            for (let i = 0; i < 15; i++) {
                const num1 = Math.floor(Math.random() * 50) + 1;
                const num2 = Math.floor(Math.random() * 50) + 1;
                questions.push({ num1, num2, correctAnswer: num1 - num2, userAnswer: '' });
            }

            let currentQuestionIndex = 0;

            function updateProgressBar() {
                const progressBar = document.getElementById('progress-bar');
                const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
                progressBar.style.width = progress + '%';
            }

            function renderQuestion() {
                const question = questions[currentQuestionIndex];
                document.getElementById('current-question').textContent = `${question.num1} - ${question.num2} =`;
                document.getElementById('answer-input').value = question.userAnswer || '';
                document.querySelector('.question-number').textContent = `Question ${currentQuestionIndex + 1}/15`;

                document.getElementById('back-btn').disabled = currentQuestionIndex === 0;
                document.getElementById('next-btn').textContent = currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next';

                updateProgressBar();
            }

            function saveAnswer() {
                const input = document.getElementById('answer-input');
                questions[currentQuestionIndex].userAnswer = input.value;
            }

            function prevQuestion() {
                saveAnswer();
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    renderQuestion();
                }
            }

            function nextQuestion() {
                saveAnswer();
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    renderQuestion();
                } else {
                    submitQuiz();
                }
            }

            async function submitQuiz() {
                const resultsContainer = document.getElementById('results');
                let correct = 0;
                let feedback = '';
                resultsContainer.innerHTML = '';

                // Calculate the score and feedback
                questions.forEach((q, index) => {
                    const isCorrect = parseInt(q.userAnswer) === q.correctAnswer;
                    feedback += `
                        <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                            Question ${index + 1}: ${q.num1} - ${q.num2} = ${q.correctAnswer} 
                            (${isCorrect ? 'Correct' : `Your Answer: ${q.userAnswer || 'Blank'}`})
                        </div>
                    `;
                    if (isCorrect) correct++;
                });

                // Send quiz data to the backend
                try {
                    const response = await fetch(`${pythonURI}/api/userstats`, {
                        ...fetchOptions,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user: storedName,
                            correct: correct,
                            total: questions.length
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to submit quiz');
                    }

                    const data = await response.json();

                    // Backend response: updated XP and level
                    const { xp, level } = data;

                    // Check for level-up condition
                    const leveledUp = xp === 0 && level > 1;

                    // Display progress and XP bar
                    resultsContainer.innerHTML = `
                        <h2>Quiz Results</h2>
                        <div class="xp-bar-container">
                            <div class="xp-bar" style="width: ${(xp / (level * 10)) * 100}%;"></div>
                        </div>
                        <div class="progress-label">
                            XP: ${xp}/${level * 10} | Level: ${level}
                        </div>
                        ${leveledUp ? '<h3>Level Up!</h3>' : ''}
                        <div class="answer-feedback">${feedback}</div>
                        <button class="refresh-btn" onclick="location.reload()">Try Again</button>
                    `;

                    // Show confetti if the user leveled up
                    if (leveledUp) {
                        launchConfetti();
                    }
                } catch (error) {
                    console.error('Error submitting quiz:', error);
                    resultsContainer.innerHTML = `<p style="color: red;">Error submitting the quiz. Please try again later.</p>`;
                }

                // Hide question UI after submission
                document.getElementById('question-container').style.display = 'none';
                document.querySelector('.navigation-buttons').style.display = 'none';
            }

            // Confetti effect
            function launchConfetti() {
                const confettiSettings = { target: 'confetti-canvas', width: window.innerWidth, height: window.innerHeight };
                const confetti = new ConfettiGenerator(confettiSettings);
                confetti.render();

                // Remove confetti after 5 seconds
                setTimeout(() => {
                    confetti.clear();
                }, 5000);
            }

            window.prevQuestion = prevQuestion;
            window.nextQuestion = nextQuestion;

            renderQuestion();
        });
    </script>

</body>
</html>
