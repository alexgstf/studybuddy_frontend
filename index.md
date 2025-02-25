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
    <a href="{{site.baseurl}}/factsbase" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Fun Facts</h3>
        <p>Interact with a Fun Fact</p>
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
        <p>Manage your tasks with our simple Task Manager tailored to your specific needs!</p>
    </div>
    </a>
    <a href="{{site.baseurl}}/notesdatabase" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Notes Manager</h3>
        <p>Share notes with other studybuddy users!</p>
    </div>
    </a>
    <a href="{{site.baseurl}}/resource_corner" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Resource Control</h3>
        <p>Upload Important Files or find important files posted by others for your own needs in school!</p>
    </div>
    </a>

<style>
/* Adjust the size of the large card to match the width of the two cards below it */
.hero {
    padding: 30px 20px;
    max-width: 900px;
    margin: 0 auto;
}

button {
    font-size: 1rem;
    padding: 10px 18px;
    border-radius: 8px;
    border: none;
    background: linear-gradient(45deg, #7a4cf7, #3e3e9e, #5c51e1, #6a61b9);
    color: white;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
    background-size: 400% 400%;
}

button:hover {
    background-position: 100% 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Improved Typewriter Effect */
h1 {
    font-size: 2rem;
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid #444;
    width: 0;
    animation: typewriter 2s steps(40) 1s forwards, blink 0.75s step-end infinite;
}

@keyframes typewriter {
    0% { width: 0; }
    100% { width: 100%; }
}

@keyframes blink {
    50% { border-color: transparent; }
}
</style>
