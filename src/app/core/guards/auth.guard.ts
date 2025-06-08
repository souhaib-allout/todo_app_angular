import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthApiService} from '../apis/auth-api.service';
import {catchError, map, of} from 'rxjs';
import {CustomResponseType} from '../types/custom-response.type';

export const authGuard: CanActivateFn = (route, state) => {

  const authApi = inject(AuthApiService);
  const router = inject(Router);

  return authApi.checkIfUserAuthenticated().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
    catchError((error) => {
      console.error('Guard error:', error);
      router.navigate(['/login']);
      return of(false);
    })
  );

}
