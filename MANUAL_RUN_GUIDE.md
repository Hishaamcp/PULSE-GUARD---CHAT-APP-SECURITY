# ChatRASP - Manual Run Guide

This guide explains how to run the ChatRASP application manually with all components.

## Project Structure

```
chatrasp/
├── ai_server.py              # Python Flask AI server (phishing detection)
├── server.js                 # Node.js chat server with Socket.IO
├── package.json              # Root package configuration
├── phishing_model.pkl        # Pre-trained ML model for phishing detection
├── frontend/                 # React frontend (optional)
│   ├── package.json
│   └── src/
├── public/                   # Static HTML/JS files served by Node
│   ├── index.html
│   ├── chat.html
│   └── style.css
└── node_modules/             # Node dependencies (installed via npm)
```

## Prerequisites

Before running, ensure you have:

1. **Node.js & npm** - Download from https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Python 3.12** - Download from https://www.python.org/
   - Verify: `python --version`

3. **Required Python packages** - Already installed:
   - Flask
   - numpy
   - scikit-learn
   - pickle (built-in)

## Option 1: Quick Start (Recommended)

### Step 1: Open Two PowerShell Windows

**Window 1** (Python AI Server):
```powershell
cd C:\Users\adnan\OneDrive\Desktop\chatrasp
python ai_server.py
```

Expected output:
```
Successfully loaded model from phishing_model.pkl
Starting AI Server on port 5000...
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

**Window 2** (Node Chat Server):
```powershell
cd C:\Users\adnan\OneDrive\Desktop\chatrasp
npm start
```

Expected output:
```
> chatrasp@1.0.0 start
> node server.js

Server running on http://localhost:3000
```

### Step 2: Open Browser

Navigate to: **http://localhost:3000**

You should see the chat interface. The app is now running!

---

## Option 2: Step-by-Step Manual Instructions

### Part A: Start Python AI Server

1. Open PowerShell
2. Navigate to project:
   ```powershell
   cd C:\Users\adnan\OneDrive\Desktop\chatrasp
   ```

3. Run the AI server:
   ```powershell
   python ai_server.py
   ```

4. Wait for this message:
   ```
   Running on http://127.0.0.1:5000
   ```

**What this does:**
- Loads the pre-trained phishing detection model (`phishing_model.pkl`)
- Starts a Flask API server on port 5000
- Listens for POST requests to `/predict` endpoint
- Analyzes messages for phishing patterns

---

### Part B: Start Node Chat Server

1. Open a **new** PowerShell window (keep the Python one running)

2. Navigate to project:
   ```powershell
   cd C:\Users\adnan\OneDrive\Desktop\chatrasp
   ```

3. Install dependencies (first time only):
   ```powershell
   npm install
   ```

4. Start the chat server:
   ```powershell
   npm start
   ```

5. Wait for this message:
   ```
   Server running on http://localhost:3000
   ```

**What this does:**
- Starts a Node.js/Express server on port 3000
- Sets up Socket.IO for real-time chat
- Serves static files from `public/` folder
- Integrates with Python AI server for RASP (phishing detection)

---

### Part C: Access the Application

1. Open your web browser
2. Go to: **http://localhost:3000**
3. You should see the ChatRASP interface

---

## How It Works

1. **User A** sends a message → Chat Server (Node.js)
2. **Chat Server** extracts features from message
3. **RASP Engine** sends features to AI Server (Python) via HTTP POST
4. **AI Server** runs the ML model for phishing detection
5. **Result** comes back (safe ✓ or phishing ✗)
6. If **SAFE**: Message forwards to **User B**
7. If **PHISHING**: Message is blocked

---

## Troubleshooting

### Problem: "Port 3000 already in use"
```powershell
# Find and kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Problem: "Port 5000 already in use"
```powershell
# Find and kill the process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Problem: "Module not found" (Python)
```powershell
# Install missing packages
pip install flask numpy scikit-learn
```

### Problem: "npm: command not found"
- Install Node.js from https://nodejs.org/
- Restart PowerShell after installation

### Problem: "python: command not found"
- Install Python from https://www.python.org/
- Check "Add Python to PATH" during installation
- Restart PowerShell

---

## Stop the Application

To gracefully shut down:

1. **Python Server** - Press `CTRL+C` in the Python PowerShell window
2. **Node Server** - Press `CTRL+C` in the Node PowerShell window

---

## Alternative: Run Frontend React App (Development Mode)

If you want to run the React frontend instead:

```powershell
cd C:\Users\adnan\OneDrive\Desktop\chatrasp\frontend
npm install
npm start
```

This will start on `http://localhost:3000` with React development server.

---

## File Descriptions

| File | Purpose |
|------|---------|
| `ai_server.py` | Flask API for ML-based phishing detection |
| `server.js` | Node.js Express + Socket.IO chat server |
| `package.json` | NPM dependencies and scripts |
| `phishing_model.pkl` | Pre-trained scikit-learn ML model |
| `public/index.html` | Main HTML interface |
| `public/chat.html` | Chat interface |
| `public/style.css` | Styling |
| `public/pulse.js` | Frontend JavaScript logic |

---

## Quick Reference

| Task | Command |
|------|---------|
| Start AI Server | `python ai_server.py` |
| Start Chat Server | `npm start` |
| Install Node deps | `npm install` |
| Check Node version | `node --version` |
| Check Python version | `python --version` |
| View running servers | Go to http://localhost:3000 |

---

## Next Steps

1. Open two PowerShell windows
2. Run `python ai_server.py` in first window
3. Run `npm start` in second window
4. Open http://localhost:3000 in browser
5. Start chatting! 🚀

Need help? Check the console output in both PowerShell windows for error messages.
