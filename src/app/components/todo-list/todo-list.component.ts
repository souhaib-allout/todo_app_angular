import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Todo, TodosList} from '../../core/types/todo.type';
import {TodoApiService} from '../../core/apis/todo-api.service';
import {catchError} from 'rxjs';
import {TodoItemComponent} from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [
    TodoItemComponent
  ],
  templateUrl: './todo-list.component.html',
  standalone: true,
  styleUrl: './todo-list.component.scss',
  providers: [TodoApiService]
})
export class TodoListComponent implements OnInit {
  todos_list: WritableSignal<Todo[]> = signal( []);
  todoApi = inject(TodoApiService);

  ngOnInit(): void {
    this.todoApi.getTodoApi().pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((todosList: Todo[]) => {
        this.todos_list.set(todosList)
        // console.log(this.todos_list())
      }
    )
  }

  changeTodoCompletedStatus() {
    this.todoApi.getTodoApi().pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((todosList: Todo[]) => {
        this.todos_list.set(todosList)
        // console.log(this.todos_list())
      }
    )
  }

}
