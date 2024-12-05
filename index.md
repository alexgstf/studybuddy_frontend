---
layout: base
title: Flocker Social Media Site
search_exclude: true
description: Login and explore our social media hub for everything DNHS
hide: true
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
        background: linear-gradient(135deg, #6A11CB, #2575FC);
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
        color: #FFD700;
    }
    .hero {
        text-align: center;
        padding: 5rem 1rem;
        background: linear-gradient(135deg, #2575FC, #6A11CB);
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
        background: #FFD700;
        color: #000;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        border-radius: 50px;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    .hero button:hover {
        background: #FFC700;
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
        color: #FFD700;
        text-decoration: none;
        font-weight: bold;
    }
    footer a:hover {
        text-decoration: underline;
    }
</style>
<header>
    <h1>Study Buddy</h1>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
</header>
<section class="hero">
    <h2>Your Ultimate Study Companion</h2>
    <p>Stay organized, collaborate effectively, and make studying fun with Study Buddy. We’re here to help you achieve your goals with ease and style!</p>
    <button>Get Started</button>
</section>
<section id="features" class="features">
    <div class="feature">
        <h3>Collaborative Tools</h3>
        <p>Work together with friends using real-time study sessions, shared notes, and more!</p>
    </div>
    <div class="feature">
        <h3>Personalized Dashboard</h3>
        <p>Track your progress and customize your study schedule to stay on top of your goals.</p>
    </div>
    <div class="feature">
        <h3>Fun Challenges</h3>
        <p>Turn studying into a game with rewards, leaderboards, and exciting challenges!</p>
    </div>
    <div class="feature">
        <h3><a href="{{site.baseurl}}/quizzone">Quiz Zone</a></h3>
        <p>Test your knowledge with our staff-curated quizzes, covering a wide variety of subjects!</p>
    </div>
    <div class="feature">
        <h3><a href="{{site.baseurl}}/task_manager">Task Manager</a></h3>
        <p>Manage your tasks with our simple Task Manger tailored to your specific needs!</p>
    </div>
    <div class="feature">
        <h3><a href="{{site.baseurl}}/resource_control">Resource Control</a></h3>
        <p>Upload Important Files or find important files posted by others for your own needs in school!</p>
    </div>
</section>

## Fun Fact Generator 🎉
Click the button below to learn something new and exciting about Math, Science, or History!
<section class="hero">
    <div id="fun-fact-container" style="text-align: center; margin-top: 20px;">
    <button id="generate-fact" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
        Generate Fun Fact
    </button>
    <p id="fun-fact" style="margin-top: 20px; font-size: 18px; font-style: italic; color: #FFF;"></p>
    </div>
</section>
<script>
document.addEventListener("DOMContentLoaded", () => {
  const facts = [
    // Math facts
    "The number zero was invented independently by ancient mathematicians in India and the Maya civilization.",
    "A 'googol' is the digit 1 followed by 100 zeros.",
    "The word 'hundred' comes from the Old Norse term 'hundrath,' which actually means 120.",
    "Pi (π) has been calculated to over 31 trillion digits as of 2024.",
    "Leonhard Euler introduced the concept of a mathematical function.",
    "Prime numbers are so important that they are used to secure online transactions.",
    "A perfect number is a positive integer that is equal to the sum of its proper divisors, excluding itself.",
    "The Fibonacci sequence is found everywhere in nature, from sunflower spirals to pinecones.",
    "The most common favorite number worldwide is 7.",
    "The concept of infinity was first studied by Greek philosopher Zeno in his paradoxes.",
    // Science facts
    "Water can boil and freeze at the same time under specific pressure conditions, called the triple point.",
    "Bananas are radioactive because they contain potassium-40, a radioactive isotope of potassium.",
    "Octopuses have three hearts, and their blood is blue due to copper-based hemocyanin.",
    "Lightning strikes the Earth about 8 million times per day.",
    "The DNA in a single human cell, if uncoiled, would stretch about 2 meters.",
    "Venus is the hottest planet in the solar system, despite Mercury being closer to the Sun.",
    "Your body contains about 37.2 trillion cells.",
    "The speed of light is 299,792 kilometers per second.",
    "Ants have been around for over 100 million years, outliving the dinosaurs.",
    "The human brain generates enough electricity to power a small LED light bulb.",
    // History facts
    "The Great Wall of China is not a single continuous wall but a series of walls built over centuries.",
    "Cleopatra lived closer in time to the moon landing than to the construction of the Great Pyramid of Giza.",
    "Napoleon was not short; he was 5'6\" or 5'7\", average height for his time.",
    "The Eiffel Tower was supposed to be dismantled after 20 years.",
    "Albert Einstein was offered the presidency of Israel in 1952 but declined.",
    "The shortest war in history was between Britain and Zanzibar on August 27, 1896. It lasted 38 minutes.",
    "The ancient Romans used lead pipes for plumbing, coining the term 'plumber' from the Latin word for lead, 'plumbum.'",
    "Shakespeare invented over 1,700 words we still use today, including 'eyeball' and 'bedroom.'",
    "In 1969, Apollo 11 astronauts left mirrors on the Moon to reflect lasers for measuring the distance between the Earth and the Moon.",
    "The longest reigning monarch in history was Louis XIV of France, who ruled for 72 years and 110 days."
  ];
  const generateFactButton = document.getElementById("generate-fact");
  const funFactDisplay = document.getElementById("fun-fact");
  generateFactButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    funFactDisplay.textContent = facts[randomIndex];
  });
});
</script>

<footer>
    <p>&copy; 2024 Study Buddy. Designed with :bulb: and :brain:. <a href="#contact">Contact Us</a></p>
</footer>