import {Routes} from '@angular/router';
import {TodoComponent} from './pages/todo/todo.component';
import {LoginComponent} from './pages/login/login.component';
import {AddTodoComponent} from './pages/add-todo/add-todo.component';
import {EditTodoComponent} from './pages/edit-todo/edit-todo.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "todos",
    component: TodoComponent,
    canActivate: [authGuard]
  },
  {
    path: "add-todo",
    component: AddTodoComponent,
    canActivate: [authGuard]

  },
  {
    path: "update-todo/:todoId",
    component: EditTodoComponent,
    canActivate: [authGuard]
  }
];
