import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoService } from '../todo';
import { TodoForm } from '../todo-form/todo-form';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoForm],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {
  todos: any[] = [];

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data: any) => {
      this.todos = data;
      this.cdr.detectChanges();
    });
  }

  toggleComplete(todo: any) {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed }).subscribe(() => {
      this.loadTodos();
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  get completedCount(): number {
    return this.todos.filter((todo) => todo.completed).length;
  }

  get progressPercent(): number {
    if (this.todos.length === 0) {
      return 0;
    }

    return (this.completedCount / this.todos.length) * 100;
  }
}
