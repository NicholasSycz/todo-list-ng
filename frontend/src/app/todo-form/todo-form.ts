import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule], // FormsModule is needed for [(ngModel)] which is the two-way binding in the template
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  title = '';
  note = '';

  // Output and EventEmitter let the component notify its parent (the todo-list) when a todo is created
  //    Similar to callback props in React
  @Output() todoCreated = new EventEmitter<void>();

  constructor(private todoService: TodoService) {}

  onSubmit() {
    if (!this.title) return;

    this.todoService.createTodo({ title: this.title, note: this.note }).subscribe(() => {
      this.todoCreated.emit();
      this.title = '';
      this.note = '';
    })
  }
}
