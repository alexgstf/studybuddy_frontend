---
layout: base
title: Chatroom
permalink: /chatroom
---

<div class="container">
    <div class="white-container" style="background-color: white; border-radius: 10px; box-shadow: 0 10px 20px rgba(58, 68, 177, 0.3); padding: 20px;">
        <ul class="nav nav-tabs" id="topicTabs" role="tablist" style="display: flex; width: 100%; padding: 0; margin: 0; border-top-left-radius: 10px; border-top-right-radius: 10px; background-color: rgb(220, 200, 250);">
            <!-- JavaScript will populate this -->
        </ul>
        <div class="tab-content" id="topicTabContent" style="border: 2px solid #3e3e9e; padding: 15px; border-radius: 10px; margin-top: 10px; background-color: #6a61b9; color: white;">
            <!-- JavaScript will populate this -->
        </div>
    </div>
</div>

<script>
    // Fetch data from the Flask API and populate the tabs with Bootstrap interactivity
    async function fetchTopics() {
        const response = await fetch('http://127.0.0.1:8887/api/topics');
        const topics = await response.json();
        
        const tabsContainer = document.getElementById('topicTabs');
        const contentContainer = document.getElementById('topicTabContent');

        tabsContainer.innerHTML = '';
        contentContainer.innerHTML = '';

        topics.forEach((topic, index) => {
            const isActive = index === 0 ? 'active' : '';
            const tabElement = `
                <li class="nav-item" role="presentation" style="flex-grow: 1; text-align: center;">
                    <button class="nav-link ${isActive}" id="tab-${index}" data-bs-toggle="tab" data-bs-target="#content-${index}" 
                            type="button" role="tab" aria-controls="content-${index}" aria-selected="${index === 0}" 
                            style="width: 100%; border-radius: 0;">
                        ${topic.topic}
                    </button>
                </li>
            `;
            tabsContainer.innerHTML += tabElement;

            const contentElement = `
                <div class="tab-pane fade ${isActive ? 'show active' : ''}" id="content-${index}" 
                     role="tabpanel" aria-labelledby="tab-${index}">
                    <p>${topic.description}</p>
                </div>
            `;
            contentContainer.innerHTML += contentElement;
        });
    }

    fetchTopics();
</script>

<!-- Bootstrap CSS & JS for tab functionality -->
<link rel="stylesheet" 
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<style>
    /* General Font Import */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    /* White Container */
    .white-container {
        background-color: white;
        border-radius: 10px; /* Consistent border-radius */
        box-shadow: 0 10px 20px rgba(58, 68, 177, 0.3); /* Soft shadow */
        font-family: 'Poppins', sans-serif;
        padding: 20px;
    }

    /* Tabs */
    .nav-tabs {
        display: flex;
        width: 100%;
        padding: 0;
        margin: 0;
        border-top-left-radius: 10px; /* Rounded outer top-left corner */
        border-top-right-radius: 10px; /* Rounded outer top-right corner */
        background-color: rgb(220, 200, 250); /* Light purple background */
    }

    .nav-tabs .nav-link {
        border-radius: 0 !important;
        flex-grow: 1;
        text-align: center;
        padding: 15px;
        border: 1px solid #007bff;
        color: #333; /* Ensures text is readable */
        background-color: #f8f9fa; /* Neutral background color for tabs */
    }

    .nav-tabs .nav-item {
        flex-grow: 1;
    }

    .nav-tabs .nav-link.active {
        background-color: #007bff; /* Blue background for active tab */
        color: white; /* White text for active tab */
    }

    /* Tab Content */
    .tab-content {
        border: 2px solid #3e3e9e; /* Deep blue border */
        padding: 15px;
        border-radius: 10px; /* Matching border-radius */
        margin-top: 10px;
        background-color: #6a61b9; /* Subtle background color */
        color: white; /* White text for readability */
    }
</style>




<style>
    /* General Font Import */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    /* Chatroom Container */
    #chatroom-container {
        width: 100%; /* Wider container */
        margin: auto;
        padding: 10px;
        background:rgb(220, 200, 250); 
        border: 0.5px solid rgb(220, 200, 250); 
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(58, 68, 177, 0.3); /* Soft shadow */
        font-family: 'Poppins', sans-serif;
        position: relative;
        z-index: 1;
    }

    /* Thicker Purple Outer Border */
    #chatroom-container::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border-radius: 20px;
        border: 10px solid #7a4cf7; /* Thicker purple outer border */
        z-index: -1;
    }

    /* Chat Display */
    #chat-display {
        border: 2px solid #3e3e9e; /* Deep blue border */
        border-radius: 10px;
        padding: 15px;
        height: 300px;
        overflow-y: scroll;
        background: #6a61b9; /* Subtle background color */
        color: #ffffff; /* White text for readability */
        font-size: 16px; /* Bigger font size */
        line-height: 1.5;
    }

    /* Individual Messages */
    #chat-display div {
        margin-bottom: 12px;
        padding: 10px;
        background: #7a4cf7; /* Light purple background for messages */
        color: #ffffff; /* White text for contrast */
        border-radius: 8px;
        word-wrap: break-word;
        font-size: 16px; /* Larger font for message text */
    }

    /* Chat Input Container */
    #chat-input {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    /* Message Input */
    #message-input {
        width: 80%;
        padding: 12px;
        border: 2px solid #7a4cf7; /* Light purple border */
        border-radius: 10px;
        outline: none;
        background: #3e3e9e; /* Deep blue background */
        color: #ffffff; /* White text */
        font-size: 16px; /* Bigger font size */
        font-family: 'Poppins', sans-serif;
        transition: border-color 0.3s;
    }

    #message-input:focus {
        border-color: #5c51e1; /* Highlight border on focus */
    }

    /* Send Button */
    #send-button {
        padding: 12px 25px;
        border: none;
        border-radius: 10px;
        background: #5c51e1; /* Medium blue button */
        color: #ffffff; /* White text */
        font-size: 16px; /* Bigger font size */
        font-weight: bold;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
    }

    #send-button:hover {
        background: #7a4cf7; /* Light purple on hover */
        transform: scale(1.05);
    }

    /* Scrollbar Styling */
    #chat-display::-webkit-scrollbar {
        width: 8px; /* Thinner scrollbar */
    }

    #chat-display::-webkit-scrollbar-thumb {
        background: #5c51e1; /* Lighter blue for scrollbar thumb */
        border-radius: 5px;
    }

    #chat-display::-webkit-scrollbar-track {
        background: #6a61b9; /* Match chat display background */
    }

    /* Title Style */
    #chat-title {
        font-size: 30px;
        font-weight: 600;
        color: #ffffff; /* White title color */
        text-align: center;
        margin-bottom: 20px;
        opacity: 0;
        animation: fadeInScale 1.5s forwards; /* Fade-in and scale effect */
    }

    /* Fade-in and scale effect */
    @keyframes fadeInScale {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>


<div id="chat-title">Chatroom</div>
<div id="chatroom-container">
    <!-- Chat display area -->
    <div id="chat-display" style="border: 1px solid #ccc; padding: 10px; height: 300px; overflow-y: scroll;">
        <!-- Messages will be dynamically added here -->
    </div>

    <!-- Input area -->
    <div id="chat-input" style="margin-top: 10px;">
        <input type="text" id="message-input" placeholder="Type your message here..." style="width: 80%; padding: 5px;">
        <button id="send-button" style="padding: 5px 10px;">Send</button>
    </div>
</div>

<script type="module">
import { pythonURI, fetchOptions } from './assets/js/api/config.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chat-display');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Function to fetch and display messages
    async function fetchMessages() {
        try {
            const response = await fetch(`${pythonURI}/api/chatroom/get_messages`, fetchOptions);
            if (!response.ok) throw new Error('Failed to fetch messages');
            const messages = await response.json();

            // Clear chat display and append messages
            chatDisplay.innerHTML = '';
            messages.forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.textContent = `${msg.username}: ${msg.message}`;
                chatDisplay.appendChild(messageDiv);
            });

            // Scroll to the bottom of the chat display
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    }

    // Function to send a message
    async function sendMessage() {
        const message = messageInput.value.trim();
        const username = localStorage.getItem('username');

        if (!username || username === 'false') {
            alert('You must be logged in to send a message.');
            return;
        }

        if (!message) {
            alert('Message cannot be empty.');
            return;
        }

        try {
            const response = await fetch(`${pythonURI}/api/chatroom/send_message`, {
                ...fetchOptions,
                method: 'POST',
                body: JSON.stringify({ username, message })
            });

            if (!response.ok) throw new Error('Failed to send message');
            messageInput.value = '';
            fetchMessages(); // Refresh messages after sending
        } catch (err) {
            console.error('Error sending message:', err);
        }
    }

    // Event listener for send button
    sendButton.addEventListener('click', sendMessage);

    // Event listener for Enter key
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Fetch messages every 2 seconds
    setInterval(fetchMessages, 2000);

    // Initial fetch
    fetchMessages();
});
</script>
