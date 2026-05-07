<<<<<<< HEAD
# Global News Aggregator

A high-performance, full-stack news aggregation platform designed for speed and multilingual capabilities. The platform uses automated ingestion pipelines to fetch, categorize, and store hundreds of thousands of articles (127k+ scale) from global sources via the GNews API.

It features a sophisticated user interface with a "Midnight Navy" Day/Night mode, seamless user authentication, and localized article sorting.

---

## Tech Stack & Dependencies

The project is structured with a React frontend and an Express/MongoDB backend.

### Frontend Dependencies (Vite + React)

*Found in `/package.json`*

* **Core Framework:** `React 18` & `Vite`
* **Styling:** `TailwindCSS v4`
* **Typography:** `@fontsource/merriweather` & `@fontsource/playfair-display`
* **API Client:** `axios`

### Backend Dependencies (Node.js + Express)

*Found in `/Server/package.json`*

* **Server Framework:** `express`, `cors`
* **Database & ORM:** `mongoose` (MongoDB)
* **Authentication:** `bcryptjs`, `jsonwebtoken`
* **Automated Ingestion Pipeline:** `node-cron` (CRON jobs for fetching fresh articles)
* **External APIs:** `axios`, `node-fetch` (Connects to GNews v4 API)
* **Data Processing:** `csv-parser`
* **Localization:** `geoip-lite`

---

## How to Start the Project Locally

Follow these steps to get the News platform running on your local machine:

### 1. Configure the Environment

You must create a `.env` file in the `/Server` directory containing at least:

* Your MongoDB Connection URI
* Your JWT Secret Key
* Your GNews API Key (v4)

### 2. Install Dependencies

Open two separate terminals to install the node modules for both sides of the stack.

**Terminal 1 (Frontend):**

```bash
cd News
npm install
```

**Terminal 2 (Backend):**

```bash
cd News/Server
npm install
```

### 3. Start the Backend Server

In your Server terminal:

```bash
node server.js
```

*Note: Ensure your local or remote MongoDB instance is running. The `node-cron` pipeline will automatically initialize in the background to fetch the latest global news.*

### 4. Start the Frontend Application

In your Frontend terminal:

```bash
npm run dev
```

Navigate to the provided localhost URL (typically `http://localhost:5173`) in your browser to view the platform.

---

## Project Highlights

* **Automated Data Pipeline:** A robust multi-service ingestion pipeline uses cron jobs to perform bulk ingestion of articles constantly without user intervention.
* **Massive Data Scale:** Optimized MongoDB schema mapping and persistent language tagging capabilities handle a database of over 100,000 global articles with millisecond search queries.
* **Premium UI/UX:** A "Midnight Navy" custom theming system built with Tailwind, complete with dynamic Navbar elements and Settings Modals.
* **Geolocalized Routing:** Utilizes `geoip-lite` to automatically present relevant breaking news to the user based on their location.
=======
# NewsWebsite
>>>>>>> 27284b8c1bc24d36084e62e6cabb4aa6dbdfe92d
