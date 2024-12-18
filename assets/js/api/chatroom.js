import { pythonURI, fetchOptions } from './assets/js/api/config.js'

document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chat-display');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Function to fetch and display messages
    async function fetchMessages() {
        try {
            const response = await fetch(`${pythonURI}/api/chatroom/get_messages`, fetchOptions);
            if (!response.ok) {
                throw new Error(`Failed to fetch messages: ${response.statusText}`);
            }
            const messages = await response.json();

            // Clear current messages and display the new ones
            chatDisplay.innerHTML = '';
            messages.forEach((msg) => {
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

    // Function to send a new message
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
                body: JSON.stringify({ username, message }),
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }

            // Clear the message input and refresh the messages
            messageInput.value = '';
            await fetchMessages();
        } catch (err) {
            console.error('Error sending message:', err);
        }
    }

    // Event listener for the Send button
    sendButton.addEventListener('click', sendMessage);

    // Event listener for pressing Enter in the message input
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Fetch messages every 2 seconds to keep the chat real-time
    setInterval(fetchMessages, 2000);

    // Initial fetch to load existing messages
    fetchMessages();
});
