// Establish WebSocket connection
const socket = new WebSocket('ws://your-server-address:port');

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const userName = document.getElementById('username');

// Listen for chat messages
socket.onmessage = function(event) {
    const messageData = JSON.parse(event.data);
    displayMessage(messageData.username, messageData.message);
};

// Send message to server
chatForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const message = event.target.elements.msg.value;

    if (message.trim() === '') {
        return false;
    }

    // Send message to server
    socket.send(JSON.stringify({
        username: userName.value,
        message: message
    }));

    // Clear input field
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
});

// Display message on the chat
function displayMessage(username, message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${username}</p><p class="text">${message}</p>`;
    chatMessages.appendChild(div);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
}