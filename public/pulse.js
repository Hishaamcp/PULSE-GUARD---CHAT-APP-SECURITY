// Connect to namespaces
const socketA = io('/A');
const socketB = io('/B');

// DOM Elements - User A
const inputA = document.getElementById('input-a');
const sendA = document.getElementById('send-a');
const messagesA = document.getElementById('messages-a');
const typingA = document.getElementById('typing-a');

// DOM Elements - User B
const inputB = document.getElementById('input-b');
const sendB = document.getElementById('send-b');
const messagesB = document.getElementById('messages-b');
const typingB = document.getElementById('typing-b');

// Alert System
const alertOverlay = document.getElementById('rasp-alert');

function showAlert() {
    alertOverlay.classList.add('visible');
}

function closeAlert() {
    alertOverlay.classList.remove('visible');
}

// Helper: Append Message
function appendMessage(container, text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', type);

    const content = document.createElement('div');
    content.textContent = text;

    const time = document.createElement('span');
    time.classList.add('timestamp');
    const now = new Date();
    time.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    msgDiv.appendChild(content);
    msgDiv.appendChild(time);

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

// --- User A Logic ---

sendA.addEventListener('click', () => {
    const text = inputA.value.trim();
    if (text) {
        socketA.emit('chat_message', text);
        appendMessage(messagesA, text, 'sent');
        inputA.value = '';
    }
});

inputA.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendA.click();
    socketA.emit('typing');
});

socketA.on('chat_message', (msg) => {
    appendMessage(messagesA, msg, 'received');
});

socketA.on('blocked', () => {
    showAlert();
    // Optionally visualize that the message failed to send in the sender's view
    // For now, the alert is global/modal enough
});

socketA.on('typing', () => {
    typingA.classList.add('active');
    setTimeout(() => typingA.classList.remove('active'), 2000);
});


// --- User B Logic ---

sendB.addEventListener('click', () => {
    const text = inputB.value.trim();
    if (text) {
        socketB.emit('chat_message', text);
        appendMessage(messagesB, text, 'sent');
        inputB.value = '';
    }
});

inputB.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendB.click();
    socketB.emit('typing');
});

socketB.on('chat_message', (msg) => {
    appendMessage(messagesB, msg, 'received');
});

socketB.on('blocked', () => {
    showAlert();
});

socketB.on('typing', () => {
    typingB.classList.add('active');
    setTimeout(() => typingB.classList.remove('active'), 2000);
});
