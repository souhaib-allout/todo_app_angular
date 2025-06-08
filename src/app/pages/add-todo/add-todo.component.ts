import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TodoApiService} from '../../core/apis/todo-api.service';
import {catchError} from 'rxjs';
import {AuthApiService} from '../../core/apis/auth-api.service';
import {TodoFormComponent} from '../../components/todo-form/todo-form.component';
import {Todo} from '../../core/types/todo.type';

@Component({
  selector: 'app-add-todo',
  imports: [
    ReactiveFormsModule,
    TodoFormComponent
  ],
  templateUrl: './add-todo.component.html',
  standalone: true,
  styleUrl: './add-todo.component.scss',
  providers: [TodoApiService]

})
export class AddTodoComponent {


  todoApi = inject(TodoApiService);
  // loginApi = inject(AuthApiService);


  addTodo(todo: Todo) {
    this.todoApi.addTodoApi(todo).pipe(
      catchError((err) => {
        alert('error')
        throw err;
      })
    ).subscribe((response) => {
      alert('todo added')
    });
  }
}
