# Sustaine - SME Resilience Simulator 🌱

A modern full-stack web application for simulating SME resilience and sustainability outcomes. Built with **React** (Frontend) and **FastAPI** (Backend).  
**Metrics reference**: See [METRICS_DOCUMENTATION.md](./METRICS_DOCUMENTATION.md) for client-updated inputs and outputs.

## Features

- **🌍 SME Resilience Simulator**: Adjust sustainability strategy, financials, and impact potentials to see economic, environmental, and strategic scores and projections.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Recharts, Lucide React
- **Backend**: Python, FastAPI, NumPy

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)

### 1. Backend Setup

The backend handles the API and database logic.

```bash
# Create a virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies (from project root)
pip install -r requirements.txt

# Run the backend server
uvicorn backend.main:app --reload
```

The server will start at `http://localhost:8000`.

### 2. Frontend Setup

The frontend is a React application served by Vite.

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will start at `http://localhost:5173`.

## Usage

1. Open your browser to `http://localhost:5173`.
2. **Simulator**: Use the SME Resilience Simulator page to adjust inputs and view economic, environmental, and strategic scores (see METRICS_DOCUMENTATION.md for all parameters).

## Project Structure

```
.
├── backend/                    # Python FastAPI Backend
│   ├── main.py                 # App entry point
│   ├── api.py                  # API Endpoints
│   ├── models.py               # Pydantic data models (SME inputs/outputs)
│   ├── sme_simulator.py        # SME Resilience simulation logic
│   └── config.py               # App config
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page views (ClimateSimulator, etc.)
│   │   └── services/           # API client
├── METRICS_DOCUMENTATION.md    # Input/output metrics (client-updated)
├── requirements.txt            # Python dependencies
└── README.md
```
