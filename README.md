# todo-list-ng

Work-in-progress full-stack todo app:
- `backend/`: Flask + SQLAlchemy + SQLite API
- `frontend/`: Angular app

## Tech Stack

- Python (Flask, Flask-SQLAlchemy, Flask-CORS)
- SQLite (local file database)
- Angular 21

## Project Structure

```text
todo-list-ng/
├── backend/
│   ├── app.py
│   ├── models.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── package.json
│   └── angular.json
├── PLAN.md
└── README.md
```

## Prerequisites

- Python 3.10+ (recommended)
- Node.js 20+ and npm

## Backend Setup (Flask)

From repo root:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

Run the backend:

```bash
python backend/app.py
```

Backend runs on `http://localhost:5000`.

## Frontend Setup (Angular)

In a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`.

## API Endpoints

Base URL: `http://localhost:5000`

- `GET /todos` - List all todos
- `POST /todos` - Create a todo
- `GET /todos/<id>` - Get one todo
- `PUT /todos/<id>` - Update a todo
- `DELETE /todos/<id>` - Delete a todo

Example create payload:

```json
{
  "title": "Buy groceries",
  "note": "Milk, eggs, bread"
}
```

## Notes

- SQLite DB file is created automatically when the backend starts.
- CORS is enabled so the Angular app can call the Flask API during development.
