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
    <a href="{{site.baseurl}}/login"><button>Get Started</button></a>
</section>
<section id="features" class="features">
    <a href="{{site.baseurl}}/chatroom" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Collaborative Tools</h3>
        <p>Work together with friends using real-time study sessions, shared notes, and more!</p>
    </div>
    </a>
    <div class="feature">
        <h3>Personalized Dashboard</h3>
        <p>Track your progress and customize your study schedule to stay on top of your goals.</p>
    </div>
    <div class="feature">
        <h3>Fun Challenges</h3>
        <p>Turn studying into a game with rewards, leaderboards, and exciting challenges!</p>
    </div>
    <a href="{{site.baseurl}}/studybuddy/quizhome.html" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Quiz Zone</h3>
        <p>Test your knowledge with our staff-curated quizzes, covering a wide variety of subjects!</p>
    </div>
    </a>
    <a href="{{site.baseurl}}/task_manager" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Task Manager</h3>
        <p>Manage your tasks with our simple Task Manger tailored to your specific needs!</p>
    </div>
    </a>
    <a href="{{site.baseurl}}/resource_corner" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Resource Control</h3>
        <p>Upload Important Files or find important files posted by others for your own needs in school!</p>
    </div>
    </a>
</section>






<style>
.login-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; /* allows the cards to wrap onto the next line if the screen is too small */
}

.login-card {
    margin-top: 20px; /* remove the top margin */
    width: 45%;
    border: 10px solid #ddd;
    border-radius: 25px;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    overflow-x: auto; /* Enable horizontal scrolling */
}

.login-card h1 {
    margin-bottom: 20px;
}

.signup-card {
    margin-top: 20px; /* remove the top margin */
    width: 45%;
    border: 10px solid #ddd;
    border-radius: 25px;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    overflow-x: auto; /* Enable horizontal scrolling */
}

.signup-card h1 {
    margin-bottom: 20px;
}

label {
    font-size: 1.1rem; /* Slightly bigger text for readability */
    color:rgb(236, 247, 255); /* Stronger grey for better contrast and readability */
}

/* Modern Input Boxes with Dynamic Moving Gradient (Vibrant Purple) */
input[type="text"], input[type="password"] {
    font-size: 1.1rem; /* Increased font size for better readability */
    padding: 12px 15px;
    width: 100%;
    margin-top: 5px;
    border-radius: 8px; /* Rounded corners for inputs */
    border: 1px solid #ddd; /* Light border to match theme */
    background: linear-gradient(45deg, #7a4cf7, #4a69bb, #3e3e9e, #b04da1); /* Softer purple gradient */
    background-size: 400% 400%; /* Make the gradient large enough for movement */
    color: white; /* White text for contrast */
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
    transition: box-shadow 0.3s ease; /* Smooth transition for the shadow */
    animation: gradientAnimation 5s ease infinite; /* Apply animation */
}

/* Focus Effect for Inputs */
input[type="text"]:focus, input[type="password"]:focus {
    outline: none; /* Remove default focus outline */
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7); /* Soft white glow on focus */
}

/* Keyframes for the Moving Gradient Effect */
@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

button {
    font-size: 1.1rem; /* Increased font size for readability */
    padding: 12px 20px;
    width: 100%;
    border-radius: 8px; /* Rounded corners for buttons */
    border: none; /* Remove border */
    background: linear-gradient(45deg, #7a4cf7, #3e3e9e, #5c51e1, #6a61b9); /* Muted purple gradient */
    color: white; /* White text for contrast */
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
    transition: background 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for background and shadow */
    animation: gradientAnimation 5s ease infinite; /* Apply animation */
    background-size: 400% 400%; /* Make the gradient large enough for movement */
}

/* Button Hover Effect */
button:hover {
    background: linear-gradient(45deg, #6a61b9, #7a4cf7, #5c51e1, #3e3e9e); /* Reversed gradient on hover */
    box-shadow: 0 0 10px rgba(100, 100, 255, 0.7); /* Soft glow effect on hover */
}

/* Button Focus Effect */
button:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7); /* Soft white glow on focus */
}

/* Keyframes for the Moving Gradient Effect */
@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

h1 {
    font-size: 2.5rem; /* Adjust font size for titles */
    overflow: hidden; /* Hide text during the animation */
    white-space: nowrap; /* Keep text on a single line */
    border-right: 3px solid #444; /* Simulate the typing cursor */
    width: 0; /* Initially, the text will have width 0 */
    animation: typewriter 2s steps(30) 1s forwards, blink 0.75s step-end infinite; /* Animation to simulate typing */
}

/* Typewriter Animation */
@keyframes typewriter {
    0% {
        width: 0;
    }
    100% {
        width: 100%; /* Fully reveal the text */
    }
}

.fact-container {
    display: block; 
    margin: 20px auto; 
    max-width: 700px; 
    width: 90%; 
    padding: 30px;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}

#fact {
    font-size: 24px;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    animation: colorChange 3s infinite;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes colorChange {
    0% { color: #ff9a9e; }
    33% { color: #fad0c4; }
    66% { color: #a1c4fd; }
    100% { color: #fbc2eb; }
}

</style>


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
