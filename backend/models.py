from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

# create database instance
db = SQLAlchemy()

class Todo(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    title       = db.Column(db.String(200), nullable=False)
    note        = db.Column(db.Text, nullable=True)
    completed   = db.Column(db.Boolean, default=False, nullable=False)
    created_at  = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id":           self.id,
            "title":        self.title,
            "note":         self.note,
            "completed":    self.completed,
            "created_at":   self.created_at.isoformat(),
        }
