---
layout: base
title: Chatroom
permalink: /chatroom
---

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
