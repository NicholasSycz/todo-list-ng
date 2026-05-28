import { NgClass, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, PLATFORM_ID, ViewChild, computed, inject, signal } from '@angular/core';
import rough from 'roughjs';
import { Todo, TodoService } from '../todo';
import { TodoForm } from '../todo-form/todo-form';

@Component({
  selector: 'app-todo-list',
  imports: [NgClass, TodoForm],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit, AfterViewInit, OnDestroy {
  todos = signal<Todo[]>([]);
  completedCount = computed(() => this.todos().filter(t => t.completed).length);
  progressPercent = computed(() =>
    this.todos().length === 0 ? 0 : (this.completedCount() / this.todos().length) * 100
  );

  @ViewChild('roughBorder') roughBorderRef!: ElementRef<SVGSVGElement>;
  @ViewChild('card') cardRef!: ElementRef<HTMLElement>;

  private todoService = inject(TodoService);
  private platformId = inject(PLATFORM_ID);
  private resizeObserver: ResizeObserver | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTodos();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.drawBorder());
      this.resizeObserver = new ResizeObserver(() => requestAnimationFrame(() => this.drawBorder()));
      this.resizeObserver.observe(this.cardRef.nativeElement);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  private drawBorder(): void {
    const svg = this.roughBorderRef.nativeElement;
    const { width: w, height: h } = this.cardRef.nativeElement.getBoundingClientRect();
    if (w === 0 || h === 0) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    svg.setAttribute('width', `${w}`);
    svg.setAttribute('height', `${h}`);

    const rc = rough.svg(svg);

    const base = { roughness: 2, fill: 'none', seed: 42 };

    // Outer frame
    svg.appendChild(rc.rectangle(10, 10, w - 20, h - 20, {
      ...base,
      stroke: 'rgba(120, 53, 15, 0.5)',
      strokeWidth: 2,
    }));

    // Inner frame
    svg.appendChild(rc.rectangle(20, 20, w - 40, h - 40, {
      ...base,
      roughness: 1.5,
      seed: 99,
      stroke: 'rgba(120, 53, 15, 0.28)',
      strokeWidth: 1.2,
    }));
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos.set(data);
      requestAnimationFrame(() => this.drawBorder());
    });
  }

  toggleComplete(todo: Todo) {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed }).subscribe(() => {
      this.loadTodos();
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }
}
