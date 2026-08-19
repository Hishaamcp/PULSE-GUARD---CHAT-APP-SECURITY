const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// RASP Analysis Engine (AI Integrated)
async function analyze(message) {
    try {
        // 1. Feature Extraction (Mock/Heuristic for Demo)
        // The model expects 30 numeric features (e.g., UCI Phishing dataset features).
        // Since we only have a text message, we'll map keywords to feature vectors
        // to demonstrate the model's decision making.

        const suspiciousPatterns = ["login", "verify", "urgent", ".tk", ".xyz", "click here"];
        const lowerMsg = message.toLowerCase();
        let isSuspicious = false;

        for (const pattern of suspiciousPatterns) {
            if (lowerMsg.includes(pattern)) {
                isSuspicious = true;
                break;
            }
        }

        // Generate 30 features
        // If suspicious: send mostly -1s (Phishing indicators)
        // If safe: send mostly 1s (Safe indicators)
        const features = new Array(30).fill(isSuspicious ? -1 : 1);

        // 2. Call Python AI Server
        const response = await axios.post('http://localhost:5000/predict', {
            features: features
        });

        console.log(`[RASP] Analyzed "${message}" -> AI Prediction: ${response.data.safe ? 'SAFE' : 'PHISHING'}`);
        return response.data.safe;

    } catch (error) {
        console.error(`[RASP] AI Server Error: ${error.message}`);
        // Fallback: Default to block if AI is down for security, or allow if fail-open.
        // For this demo, we'll fail-safe (block) if it looks suspicious, otherwise allow.
        return true;
    }
}

// Namespaces
const nspA = io.of('/A');
const nspB = io.of('/B');

// User A Connection
nspA.on('connection', (socket) => {
    console.log('🔥 User A connected');

    socket.on('chat_message', async (msg) => {
        console.log(`[User A]: ${msg}`);

        // RASP Check
        const isSafe = await analyze(msg);

        if (isSafe) {
            // Forward to User B
            nspB.emit('chat_message', msg);
        } else {
            // Notify Sender (User A) of Block
            socket.emit('blocked');
        }
    });

    socket.on('typing', () => {
        nspB.emit('typing');
    });

    socket.on('disconnect', () => {
        console.log('User A disconnected');
    });
});

// User B Connection
nspB.on('connection', (socket) => {
    console.log('🔥 User B connected');

    socket.on('chat_message', async (msg) => {
        console.log(`[User B]: ${msg}`);

        // RASP Check
        const isSafe = await analyze(msg);

        if (isSafe) {
            // Forward to User A
            nspA.emit('chat_message', msg);
        } else {
            // Notify Sender (User B) of Block
            socket.emit('blocked');
        }
    });

    socket.on('typing', () => {
        nspA.emit('typing');
    });

    socket.on('disconnect', () => {
        console.log('User B disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
