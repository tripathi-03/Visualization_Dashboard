#Data Visualization Dashboard

MongoDB-backed analytics dashboard built from the provided `jsondata.json`.

## Project layout
- `backend/` Express API + MongoDB seed script
- `frontend/` React dashboard (Vite + Chart.js)
- `README.md` setup instructions

## Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB server (`mongod`)

## Quick start

### 1) Dataset
Make sure the JSON file is here:

```
backend/data/jsondata.json
```

### 2) Start MongoDB
Run MongoDB locally using a project data directory:

```
mongod --dbpath C:\Users\divya\OneDrive\Desktop\Visualization_Dashboard\mongodb-data
```

If you use a different path, update it accordingly.

### 3) Backend API
```
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

Backend runs at `http://localhost:5000`.

### 4) Frontend
```
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` (or the next available port).

## API endpoints
- `GET /api/filters`
- `GET /api/summary`
- `GET /api/insights`

## Troubleshooting
- **MongoDB connection refused**: `mongod` is not running. Start it first.
- **Port 5173 in use**: Vite will auto-pick 5174/5175; use the printed URL.

## Notes
- Filters include End Year, Topic, Sector, Region, PEST, Source, SWOT, Country, City.
- The dashboard reads aggregated data from MongoDB.
