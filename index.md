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
{% include sb-theme.html %}
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
        <h3><a href="{{site.baseurl}}/studybuddy/quizhome.html">Quiz Zone</a></h3>
        <p>Test your knowledge with our staff-curated quizzes, covering a wide variety of subjects!</p>
    </div>
    <div class="feature">
        <h3><a href="{{site.baseurl}}/task_manager">Task Manager</a></h3>
        <p>Manage your tasks with our simple Task Manger tailored to your specific needs!</p>
    </div>
    <div class="feature">
        <h3><a href="{{site.baseurl}}/resource_corner">Resource Control</a></h3>
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
    <p><a href="#contact">Contact Us</a></p>
</footer>