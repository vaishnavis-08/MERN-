# CSTech Agent Management & Distribution System

This project is a full-stack application designed to manage agents and distribute work items from uploaded files (CSV/Excel). It features an Admin Dashboard for managing agents, uploading files, and viewing work distribution statistics.

## Tech Stack

**Backend:**
-   **Node.js & Express**: RESTful API server.
-   **MongoDB & Mongoose**: Database for storing admins, agents, and work items.
-   **JWT (JSON Web Tokens)**: Secure authentication for admins.
-   **Multer**: File upload middleware.
-   **CSV-Parser & XLSX**: Libraries for parsing uploaded data.

**Frontend:**
-   **Next.js (App Router)**: React framework for the client application.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Axios**: Promise-based HTTP client for API requests.
-   **Lucide React**: Icon library.

## Project Structure

-   `/`: Backend code (controllers, models, routes).
-   `/client`: Frontend Next.js application.
-   `/uploads`: Directory for temporary file storage (created automatically).

## Setup Instructions

### Prerequisites
-   Node.js installed.
-   MongoDB installed and running locally (`mongodb://localhost:27017`).

### Backend Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Configuration:**
    -   Copy `.env.example` to a new file named `.env` in the root directory.
    -   Update the values if necessary:
        ```env
        MONGO_URI=mongodb://localhost:27017/cstech_db
        JWT_SECRET=your_super_secret_key
        PORT=5003
        ```

3.  **Seed Database (Optional):**
    -   Create an initial admin user:
        ```bash
        node utils/seedAdmin.js
        ```

### Frontend Setup

1.  **Navigate to Client Directory:**
    ```bash
    cd client
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

## Running the Project

### Start Backend Server
From the root directory:
```bash
node main.js
```
The server will run on `http://localhost:5003` (or your configured PORT).

### Start Frontend Application
From the `client` directory:
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

## Usage

1.  **Login**: Access `http://localhost:3000` and log in with your Admin credentials.
2.  **Dashboard**: View total agents and distributed items.
3.  **Manage Agents**: Add, edit, or delete agents.
4.  **Upload**: Navigate to the upload page to submit CSV or Excel files. Records will be automatically distributed to agents.

## API Documentation

-   `POST /api/admin/login`: Admin login.
-   `GET /api/agents`: Get all agents.
-   `POST /api/agents/register`: Create a new agent.
-   `POST /api/upload`: Upload and distribute file records.
-   `GET /api/items/grouped`: Get detailed distribution stats.
