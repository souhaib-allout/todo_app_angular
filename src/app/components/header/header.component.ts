import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthApiService} from '../../core/apis/auth-api.service';
import {catchError, map, of} from 'rxjs';
import {response} from 'express';
import {CustomResponseType} from '../../core/types/custom-response.type';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  authApi = inject(AuthApiService);
  router = inject(Router);
  authService= inject(AuthService);

  ngOnInit(): void {
    this.authApi.checkIfUserAuthenticated().pipe(
      catchError((error) => {
        throw error;
      })
    ).subscribe((response) => {
      this.authService.setIsUserLoggedStatus(response);
    });
  }

  logout(){
    this.authApi.logout().pipe(
      catchError(err => {
        alert('error')
        throw err;
      })
    ).subscribe((response: CustomResponseType)=>{
      if(response.code=="success"){
        this.authService.setIsUserLoggedStatus(false)
        this.router.navigate(['login'])
      }else{
        alert('error')
      }
    });
  }
}
