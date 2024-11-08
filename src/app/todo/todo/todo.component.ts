import { Component, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
  standalone: true,
  imports: [FormsModule],
})
export class TodoComponent {
  todos: Todo[] = [];

  todos_s = signal<Todo[]>([]);

  todo = new Todo();
  constructor(private todoService: TodoService) {
    // this.todos = this.todoService.getTodos();
    this.todos_s.set(this.todoService.getTodos());
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  // new code
  setInProgress(i: number) {
    const temp_todos = this.todos_s();
    temp_todos[i].status = 'in progress';
  }

  setDone(i: number) {
    const temp_todos = this.todos_s();
    temp_todos[i].status = 'done';
  }
  setWaiting(i: number) {
    const temp_todos = this.todos_s();
    temp_todos[i].status = 'waiting';
  }
}
