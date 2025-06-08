import {Component, effect, inject, input, InputSignal, OnInit, output, signal} from '@angular/core';
import {Todo} from '../../core/types/todo.type';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todo-form.component.html',
  standalone: true,
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  initialData = input<Todo | undefined>();
  buttonText = input<string>();
  formSubmitted = output<Todo>();

  private formBuilder = inject(FormBuilder);

  addTodoForm!: FormGroup;

  constructor() {
    effect(() => {
      const data = this.initialData();
      this.addTodoForm = this.formBuilder.nonNullable.group({
        name: [data?.name ?? '', [Validators.required, Validators.minLength(6)]],
        completed: [data?.completed ?? false],
        userId: [data?.userId ?? null, [Validators.required]],
        id: [data?.id ?? null],
      });
    });
  }

  submit() {
    if (this.addTodoForm.valid) {
      this.formSubmitted.emit(this.addTodoForm.getRawValue());
    }
  }


}
