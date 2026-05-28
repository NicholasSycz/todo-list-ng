from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Todo

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todos.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# Routes

# GET ALL ITEMS
@app.route("/todos", methods=["GET"])
def get_todos():
    todos = Todo.query.all()
    return jsonify([todo.to_dict() for todo in todos])

# CREATE NEW ITEM
@app.route("/todos", methods=["POST"])
def create_todo():
    data = request.get_json()
    todo = Todo(
        title=data["title"],
        note=data.get("note")
    )
    db.session.add(todo)
    db.session.commit()
    
    return jsonify(todo.to_dict()), 201

# GET AN ITEM
@app.route("/todos/<int:id>", methods=["GET"])
def get_todo(id):
    todo = Todo.query.get_or_404(id)
    return jsonify(todo.to_dict())

# UPDATE AN ITEM
@app.route("/todos/<int:id>", methods=["PUT"])
def update_todo(id):
    todo = Todo.query.get_or_404(id)
    
    data = request.get_json()
    if "title" in data:
        todo.title = data["title"]
    if "note" in data:
        todo.note = data["note"]
    if "completed" in data:
        todo.completed = data["completed"]
    db.session.commit()
    
    return jsonify(todo.to_dict())

# REMOVE AN ITEM
@app.route("/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"message": "Todo deleted"})


# Run Block
if __name__ == "__main__":
    app.run(debug=True, port=5001)