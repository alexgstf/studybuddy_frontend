---
layout: page 
title: Login Page
permalink: /login
search_exclude: true
show_reading_time: false 
---

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


</style>

<div class="login-container">
    <!-- Python Login Form -->
    <div class="login-card">
        <h1 id="pythonTitle">User Login</h1>
        <form id="pythonForm" onsubmit="pythonLogin(); return false;">
            <p>
                <label>
                    Username:
                    <input type="text" name="uid" id="uid" required>
                </label>
            </p>
            <p>
                <label>
                    Password:
                    <input type="password" name="password" id="password" required>
                </label>
            </p>
            <p>
                <button type="submit">Login</button>
            </p>
            <p id="message" style="color: red;"></p>
        </form>
    </div>
    <div class="signup-card">
        <h1 id="signupTitle">Sign Up</h1>
        <form id="signupForm" onsubmit="signup(); return false;">
            <p>
                <label>
                    Nickname:
                    <input type="text" name="name" id="name" required>
                </label>
            </p>
            <p>
                <label>
                    Username:
                    <input type="text" name="signupUid" id="signupUid" required>
                </label>
            </p>
            <p>
                <label>
                    Password:
                    <input type="password" name="signupPassword" id="signupPassword" required>
                </label>
            </p>
            <p>
                <button type="submit">Sign Up</button>
            </p>
            <p id="signupMessage" style="color: green;"></p>
        </form>
    </div>
</div>

<script type="module">
    import { login, pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    // Function to handle Python login
    window.pythonLogin = function() {
        const options = {
            URL: `${pythonURI}/api/authenticate`,
            callback: pythonDatabase,
            message: "message",
            method: "POST",
            cache: "no-cache",
            body: {
                uid: document.getElementById("uid").value,
                password: document.getElementById("password").value,
            }
        };
        login(options);
    }

    // Function to handle signup
    window.signup = function() {
    const signupButton = document.querySelector(".signup-card button");

    // Disable the button and change its color
    signupButton.disabled = true;
    signupButton.style.backgroundColor = '#d3d3d3'; // Light gray to indicate disabled state

    const signupOptions = {
        URL: `${pythonURI}/api/user`,
        method: "POST",
        cache: "no-cache",
        body: {
            name: document.getElementById("name").value,
            uid: document.getElementById("signupUid").value,
            password: document.getElementById("signupPassword").value,
        }
    };

    fetch(signupOptions.URL, {
        method: signupOptions.method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupOptions.body)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Signup failed: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("signupMessage").textContent = "Signup successful!";
        // Optionally redirect to login page or handle as needed
        // window.location.href = '{{site.baseurl}}/profile';
    })
    .catch(error => {
        console.error("Signup Error:", error);
        document.getElementById("signupMessage").textContent = `Signup Error: ${error.message}`;
        // Re-enable the button if there is an error
        signupButton.disabled = false;
        signupButton.style.backgroundColor = ''; // Reset to default color
    });
}


    // Function to fetch and display Python data
    function pythonDatabase() {
        const URL = `${pythonURI}/api/id`;

        fetch(URL, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Flask server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                window.location.href = '{{site.baseurl}}/profile';
            })
            .catch(error => {
                console.error("Python Database Error:", error);
                const errorMsg = `Python Database Error: ${error.message}`;
            });
    }

    // Call relevant database functions on the page load
    window.onload = function() {
         pythonDatabase();
    };
</script>
