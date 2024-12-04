---
layout: post
title: Flocker Social Media Site 
search_exclude: true
description: Login and explore our social media hub for everything DNHS 
hide: true
menu: nav/home.html
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Study Buddy</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to right, #fceabb, #f8b500);
            color: #333;
        }

        header {
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
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
            gap: 1rem;
        }

        nav ul li {
            display: inline;
        }

        nav ul li a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }

        .hero {
            text-align: center;
            padding: 3rem 1rem;
        }

        .hero h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }

        .hero button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 2rem;
        }

        .feature {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .feature h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .feature p {
            font-size: 1rem;
            color: #555;
        }

        footer {
            text-align: center;
            padding: 1rem;
            background: #333;
            color: white;
            margin-top: 2rem;
        }

        footer a {
            color: #4CAF50;
            text-decoration: none;
        }

        footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
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
        <p>Stay organized, collaborate effectively, and make studying fun with Study Buddy.</p>
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
</body>
</html>

