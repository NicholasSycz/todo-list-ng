# todo-list-ng

A full-stack bounty board app styled as a WANTED poster. Track your outlaws, claim your bounties.

- `backend/` — Flask + SQLAlchemy + SQLite REST API
- `frontend/` — Angular 21 app with SSR, Tailwind CSS, and Rough.js

## Tech Stack

- **Backend:** Python, Flask, Flask-SQLAlchemy, Flask-CORS, SQLite
- **Frontend:** Angular 21 (standalone components, signals, SSR), Tailwind CSS v4, Rough.js

## Project Structure

```text
todo-list-ng/
├── backend/
│   ├── app.py           # Flask routes
│   ├── models.py        # SQLAlchemy Todo model
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── app.ts / app.html        # Root component
│   │       ├── todo.ts                  # TodoService + Todo interface
│   │       ├── todo-list/               # Main list + WANTED poster UI
│   │       └── todo-form/               # Inline "new outlaw" form
│   ├── package.json
│   └── angular.json
├── Makefile
└── README.md
```

## Quick Start (Makefile)

A `Makefile` is included for convenience. Run all commands from the repo root.

### First-time setup

```bash
make install
```

Installs both frontend (`npm install`) and backend (creates a Python venv and runs `pip install`).

### Run both servers

```bash
make dev
```

Starts the Flask backend (port 5001) and Angular dev server (port 4200) together. **Ctrl+C stops both.**

### Other commands

| Command | Description |
|---|---|
| `make install` | Install all dependencies (frontend + backend) |
| `make install-frontend` | `npm install` only |
| `make install-backend` | Create venv + pip install only |
| `make dev` | Run both servers concurrently |
| `make dev-frontend` | Angular dev server only (`localhost:4200`) |
| `make dev-backend` | Flask server only (`localhost:5001`) |
| `make build` | Production build of the Angular app |
| `make clean` | Remove `dist/`, `node_modules/`, and `__pycache__` |

## Manual Setup (without Make)

### Backend

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
python backend/app.py
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## API Endpoints

Base URL: `http://localhost:5001`

| Method | Path | Description |
|---|---|---|
| `GET` | `/todos` | List all todos |
| `POST` | `/todos` | Create a todo |
| `GET` | `/todos/<id>` | Get one todo |
| `PUT` | `/todos/<id>` | Update a todo |
| `DELETE` | `/todos/<id>` | Delete a todo |

Example create payload:

```json
{
  "title": "Billy the Kid",
  "note": "Armed and dangerous. Last seen heading west."
}
```

## Notes

- SQLite DB is created automatically at `backend/instance/todos.db` on first run.
- CORS is enabled globally for local development.
- The Angular app uses `provideHttpClient(withFetch())` for SSR compatibility.
