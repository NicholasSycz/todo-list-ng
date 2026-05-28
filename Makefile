.PHONY: install install-frontend install-backend \
        dev dev-frontend dev-backend \
        build build-frontend build-backend \
        clean

# ── Install ──────────────────────────────────────────────────────────────────

install: install-frontend install-backend

install-frontend:
	cd frontend && npm install

install-backend:
	python3 -m venv venv
	venv/bin/pip install -r backend/requirements.txt

# ── Dev servers ──────────────────────────────────────────────────────────────

# Run both servers concurrently (Ctrl+C stops both)
dev:
	@trap 'kill 0' SIGINT; \
	venv/bin/python backend/app.py & \
	cd frontend && npm start & \
	wait

dev-frontend:
	cd frontend && npm start

dev-backend:
	venv/bin/python backend/app.py

# ── Build ────────────────────────────────────────────────────────────────────

build: build-frontend

build-frontend:
	cd frontend && npm run build

# ── Clean ────────────────────────────────────────────────────────────────────

clean:
	rm -rf frontend/dist
	rm -rf frontend/node_modules
	find backend -name '__pycache__' -exec rm -rf {} +
