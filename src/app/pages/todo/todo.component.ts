import {Component, Signal, signal} from '@angular/core';
import {TodoListComponent} from '../../components/todo-list/todo-list.component';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [
    TodoListComponent,
    TitleCasePipe
  ],
  templateUrl: './todo.component.html',
  standalone: true,
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  title: Signal<string>=signal("to do list");
}
