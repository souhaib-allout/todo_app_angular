import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodosList} from '../types/todo.type';
import {CustomResponseType} from '../types/custom-response.type';
import {catchError, map, Observable, of} from 'rxjs';
import {LoginType} from '../types/login.type';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private http = inject(HttpClient);

  login(body:LoginType ):Observable<CustomResponseType> {
    const postUrl = 'http://localhost:8080/todo/api/auth/login';
    return this.http.post<CustomResponseType>(postUrl,body, {withCredentials: true});
  }

  logout():Observable<CustomResponseType> {
    const postUrl = 'http://localhost:8080/todo/api/auth/logout';
    return this.http.post<CustomResponseType>(postUrl, null,{withCredentials: true});
  }

  checkIfUserAuthenticated(): Observable<boolean> {
    const url = 'http://localhost:8080/todo/api/auth/me';

    return this.http.get(url, {
      withCredentials: true,
      observe: 'response'
    }).pipe(
      map(response => {
        return response.status === 200;
      }),
      catchError(error => {
        console.warn('Not authenticated:', error);
        return of(false);
      })
    );
  }


}
