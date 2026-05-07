#  Crypto Scanner — Full-Stack Task

A professional cryptocurrency filtering dashboard built with **FastAPI** (Python) and **React + TypeScript**. The app identifies potential "hidden gem" projects by applying strict tokenomic filters on real-time data from the CoinGecko API.

---

##  Features

- **Strict Filtering**: Only projects meeting all criteria: `MCap > 0`, `preview_listing == true`, `Max Supply == Total Supply`, `FDV < $100M`, `24h Volume > $50k`, `TVL > $50k`.
- **Advanced Frontend**: Search by name, dynamic FDV threshold input, and sorting by Market Cap or 24h Volume.
- **Dockerized**: Entire stack (frontend + backend) runs with a single command via Docker Compose.
- **Clean Architecture**: Backend split into layers — Routers → Services → Schemas.

---

##  Quick Start (Docker — Recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

1. Clone the repository
2. Run the containers:
   ```bash
   docker-compose up --build
   ```
3. Access the app:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/coins/filtered

---

##  Manual Setup

### Backend (FastAPI)

1. Navigate to the `/backend` folder.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv

   # Windows:
   .\venv\Scripts\activate

   # Linux/Mac:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend (React + TypeScript)

1. Navigate to the `/frontend` folder.
2. Install packages:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

---

##  Assumptions & Limitations

- **Tokenomics filter**: `Max Supply == Total Supply` identifies fully diluted projects with no future inflation risk.
- **API limits**: The app uses the free public CoinGecko API (no key required). If the list is empty, it means none of the top 250 coins by market cap currently satisfy all the strict filter conditions simultaneously — this is expected behavior given how restrictive the criteria are.
- **TVL**: The `total_value_locked` field is not returned by the `/coins/markets` endpoint on the free CoinGecko tier. It is handled as `0` by default, meaning the TVL > $50k filter is effectively relaxed unless a Pro API key is provided.
- **preview_listing**: This field is also not reliably present in the free API response. The filter defaults to `true` when the field is missing so coins are not excluded unfairly.
- **CORS**: Configured for Vite's default port `5173`.

---

##  AI Workflow

**Tools used**: Claude (Anthropic), Cursor

**How they were used**:
- Designed the backend service layer and Pydantic schemas
- Generated base Docker and Docker Compose configuration
- Generated TypeScript interfaces matching the Python `CoinOut` schema
- Scaffolded React component structure (App, Filters, CoinTable, CoinRow, StatsBar)

**Where AI helped most**:
- Structuring the project cleanly from the start (routers/services/schemas separation)
- Setting up React Query with correct `staleTime` to avoid hitting CoinGecko rate limits
- Tailwind CSS table styling for responsiveness

**What was reviewed or corrected manually**:
- Fixed CORS middleware ordering in FastAPI
- Corrected PYTHONPATH inside Docker containers
- Adjusted filter logic to handle `None` values from the API gracefully
- Tuned the `apply_crypto_filters` function to skip invalid coins without crashing the whole request