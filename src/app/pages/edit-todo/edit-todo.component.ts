import {Component, inject, OnInit, signal} from '@angular/core';
import {TodoApiService} from '../../core/apis/todo-api.service';
import {Todo} from '../../core/types/todo.type';
import {catchError} from 'rxjs';
import {TodoFormComponent} from '../../components/todo-form/todo-form.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-todo',
  imports: [
    TodoFormComponent
  ],
  templateUrl: './edit-todo.component.html',
  standalone: true,
  styleUrl: './edit-todo.component.scss',
  providers: [TodoApiService]
})
export class EditTodoComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  todoApi = inject(TodoApiService);
  // loginApi = inject(AuthApiService);
  initialData = signal<Todo>({name: '', completed: false, userId: 0});
  private router = inject(Router);

  ngOnInit(): void {
    const todoId: string | null = this.activatedRoute.snapshot.paramMap.get('todoId');
    if (todoId == null) {
      this.router.navigate(['todos']);
    } else {
      this.todoApi.getTodoByIdApi(parseInt(todoId)).pipe(
        catchError((err) => {
          alert('error fetching'+err);
          throw catchError
        })
      ).subscribe((response: Todo) => {
        this.initialData.set(response)
      });
    }
  }

  updateTodo(todo: Todo) {
    this.todoApi.updateTodoApi(todo).pipe(
      catchError((err) => {
        alert('error')
        throw err;
      })
    ).subscribe((response) => {
      alert('todo added')
    });
  }

}
