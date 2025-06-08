import {Component, inject, input, InputSignal, output} from '@angular/core';
import {Todo} from '../../core/types/todo.type';
import {HighlightCompletedTodoDirective} from '../../core/directives/highlight-completed-todo.directive';
import {describe} from 'node:test';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TodoApiService} from '../../core/apis/todo-api.service';
import {catchError} from 'rxjs';
import {subscribe} from 'node:diagnostics_channel';

@Component({
  selector: 'app-todo-item',
  imports: [
    HighlightCompletedTodoDirective,
    DatePipe,
    RouterLink
  ],
  templateUrl: './todo-item.component.html',
  standalone: true,
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  todoChanged = output<void>();
  todoApi = inject(TodoApiService);

  changeCompetedStatus(event: any) {
    const todo = this.todo();
    const newStatus = event.target.checked ;
    if (todo?.id !== undefined) {
      this.todoApi.changeTodoCompletedApi(todo.id, newStatus)
        .pipe(
          (catchError(err => {
            alert('error');
            throw err;
          }))
        ).subscribe((result) => {
        this.todoChanged.emit()
      })
    }
  }

  deleteTodo() {
    const todo = this.todo();
    if (todo?.id !== undefined) {
      this.todoApi.deleteTodoApi(todo.id).pipe(
        catchError((error) => {
          alert('error')
          throw error
        })
      ).subscribe((response) => {
        alert('todo removed')
        this.todoChanged.emit()
      });
    }
  }
}
