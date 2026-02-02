# How to Run the Climate Simulator

## Quick Start Guide (Using Conda)

### Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install
```

This will install all React/Vite dependencies (first time only, takes 2-3 minutes).

**✅ Already done!** Dependencies are installed.

### Step 2: Activate Conda Environment

```bash
cd /home/ahmad/Documents/reinventing/Climate-Simulator
conda activate climate-simulator
```

**✅ Already done!** The `climate-simulator` conda environment is created and dependencies are installed.

### Step 3: Run the Backend Server

Open a terminal and run:

```bash
cd /home/ahmad/Documents/reinventing/Climate-Simulator
conda activate climate-simulator
uvicorn backend.main:app --reload --port 8001
```

The backend will start at: **http://localhost:8001**

You should see: `Uvicorn running on http://127.0.0.1:8001`

### Step 4: Run the Frontend

Open a **NEW terminal** and run:

```bash
cd /home/ahmad/Documents/reinventing/Climate-Simulator/frontend
npm run dev
```

The frontend will start at: **http://localhost:5173**

You should see: `Local: http://localhost:5173/`

### Step 5: Open in Browser

Open your browser and go to: **http://localhost:5173**

---

## Quick Commands Summary

**Terminal 1 (Backend):**
```bash
cd /home/ahmad/Documents/reinventing/Climate-Simulator
conda activate climate-simulator
uvicorn backend.main:app --reload --port 8001
```

**Terminal 2 (Frontend):**
```bash
cd /home/ahmad/Documents/reinventing/Climate-Simulator/frontend
npm run dev
```

---

## Alternative: Using Docker (All-in-One)

If you have Docker installed, you can run everything with one command:

```bash
docker-compose up
```

This will start both frontend and backend automatically.

---

## Troubleshooting

- **Port 8001 already in use?** Change the backend port: `uvicorn backend.main:app --reload --port 8002`
- **Port 5173 already in use?** Vite will automatically use the next available port
- **npm install fails?** Make sure you have Node.js v16+ installed: `node --version`
- **Conda environment not found?** Create it: `conda create -n climate-simulator python=3.11 -y && conda activate climate-simulator && pip install -r requirements.txt`
- **Backend errors?** Make sure conda environment is activated: `conda activate climate-simulator`

