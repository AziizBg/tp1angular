import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

export interface TodoModel {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-test-http',
  templateUrl: './test-http.component.html',
  styleUrls: ['./test-http.component.css'],
})
export class TestHttpComponent {
  todos: TodoModel[] = [];
  todos$: Observable<TodoModel[]>;
  constructor(private http: HttpClient) {
    this.todos$ = this.http.get<TodoModel[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
    /* this.http
      .get<TodoModel[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (todos: TodoModel[]) => (this.todos = todos),
        error: (error) => console.log(error),
      }); */
  }
}
