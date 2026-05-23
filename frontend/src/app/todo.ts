import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:5001/todos';

  constructor(private http: HttpClient) {}
  
  getTodos() {
    return this.http.get(this.apiUrl);
  }

  createTodo(todo: {title: string; note?: string }) {
    return this.http.post(this.apiUrl, todo);
  }

  updateTodo(id: number, changes: object) {
    return this.http.put(`${this.apiUrl}/${id}`, changes);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
