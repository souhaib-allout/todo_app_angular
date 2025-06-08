import {Component, effect, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TodoApiService} from '../../core/apis/todo-api.service';
import {AuthApiService} from '../../core/apis/auth-api.service';
import {LoginType} from '../../core/types/login.type';
import {CustomResponseType} from '../../core/types/custom-response.type';
import {catchError} from 'rxjs';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginApi = inject(AuthApiService);
  private formBuilder = inject(FormBuilder);
  router = inject(Router);
  authService= inject(AuthService);
  loginForm = this.formBuilder.nonNullable.group({
    email: ['test', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  onSubmit() {
    let authBody: LoginType = this.loginForm.getRawValue();
    this.loginApi.login(authBody)
      .pipe(catchError((err) => {
          console.log(err);
          alert('error')
          throw err;
        })
      )
      .subscribe((authResponse: CustomResponseType) => {
        this.authService.setIsUserLoggedStatus(true)
        this.router.navigate(['todos']);
        console.log(authResponse);
      });
  }

}
