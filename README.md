# PulseGuard - RASP Demo

**PulseGuard** is a Runtime Application Self-Protection (RASP) demonstration. It showcases a dual-user chat application where every message is analyzed in real-time by a security engine before delivery.

## 🚀 Features

- **Live Dual-User Chat**: Split-screen interface for User A and User B.
- **RASP Engine**: Intercepts and blocks suspicious messages.
- **Neon UI**: Modern, dark-themed interface with neon accents.
- **Real-time**: Powered by Socket.io.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.io

## 📦 Installation

1.  Clone the repository or download the files.
2.  Install dependencies:
    ```bash
    npm install
    ```

## ▶️ Running the App

1.  Start the server:
    ```bash
    node server.js
    ```
2.  Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## 🛡️ RASP Logic

Currently, the RASP engine uses a placeholder `analyze()` function in `server.js`. It blocks messages containing the following keywords:

- `login`
- `verify`
- `urgent`
- `.tk`
- `.xyz`
- `click here`

**Example:**
- Sending "Hello friend" → **Delivered**
- Sending "Please login here" → **Blocked** (Alert shown)

## 🔮 Future Integration

The `analyze()` function is designed to be replaced by an AI model.
Future implementation will involve:
```javascript
// Future AI Integration
async function analyze(message) {
    const response = await axios.post("http://localhost:5000/predict", { text: message });
    return response.data.is_safe;
}
```
