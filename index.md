---
layout: post
title: Flocker Social Media Site 
search_exclude: true
description: Login and explore our social media hub for everything DNHS 
hide: true
menu: nav/home.html
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
</section>

<footer>
    <p>&copy; 2024 Study Buddy. Designed with 💡 and 🧠. <a href="#contact">Contact Us</a></p>
</footer>
