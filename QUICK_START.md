# ChatRASP - Quick Start Reference

## Fastest Way to Run (Choose One)

### Method 1: Double-Click (Windows Batch)
1. Navigate to: `C:\Users\adnan\OneDrive\Desktop\chatrasp`
2. Double-click: **START_ALL.bat**
3. Wait ~5 seconds
4. Open browser to: **http://localhost:3000**

✅ Both servers start automatically in separate windows

---

### Method 2: PowerShell Script
```powershell
cd C:\Users\adnan\OneDrive\Desktop\chatrasp
.\START_ALL.ps1
```

✅ Both servers start automatically in separate windows

---

### Method 3: Manual (Two PowerShell Windows)

**Window 1:**
```powershell
cd C:\Users\adnan\OneDrive\Desktop\chatrasp
python ai_server.py
```

**Window 2:**
```powershell
cd C:\Users\adnan\OneDrive\Desktop\chatrasp
npm start
```

Then open: **http://localhost:3000**

---

## What Each Server Does

| Server | Port | Purpose |
|--------|------|---------|
| **Python AI Server** | 5000 | Analyzes messages for phishing using ML model |
| **Node Chat Server** | 3000 | Serves web interface & manages real-time chat |

---

## Keyboard Shortcuts

| Action | Key |
|--------|-----|
| Stop server | `Ctrl + C` |
| Clear console | `clear` or `cls` |
| New line | `Enter` |

---

## Access Points

- **Web Interface**: http://localhost:3000
- **AI API (direct)**: http://localhost:5000/predict
- **Chat Server API**: http://localhost:3000

---

## Troubleshooting Quick Fixes

### Ports already in use?
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <number> /F

# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <number> /F
```

### Dependencies missing?
```powershell
# For Python
pip install flask numpy scikit-learn

# For Node
npm install
```

### Still stuck?
1. Check that Python is installed: `python --version`
2. Check that Node is installed: `node --version`
3. Verify you're in the correct directory: `cd C:\Users\adnan\OneDrive\Desktop\chatrasp`
4. Look for error messages in the PowerShell windows

---

## File Guide

| File | Use |
|------|-----|
| `MANUAL_RUN_GUIDE.md` | Detailed step-by-step instructions |
| `START_ALL.bat` | ⭐ Batch script to start everything |
| `START_ALL.ps1` | PowerShell script to start everything |
| `ai_server.py` | Python backend (phishing detection) |
| `server.js` | Node.js backend (chat server) |
| `public/` | Web interface files |

---

## Success Indicators

When everything is working correctly, you should see:

**Python Window:**
```
Successfully loaded model from phishing_model.pkl
Starting AI Server on port 5000...
 * Running on http://127.0.0.1:5000
```

**Node Window:**
```
Server running on http://localhost:3000
```

**Browser:**
- Page loads without errors
- Chat interface is visible
- No console errors (press F12 to check)

---

## Next Time You Run

1. Use `START_ALL.bat` or `START_ALL.ps1` (fastest)
2. Wait for both windows to appear
3. Open http://localhost:3000
4. Done! ✅

