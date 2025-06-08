import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLogged = signal<boolean>(false);

  constructor() {
  }

  setIsUserLoggedStatus(newStatus: boolean) {
    this.isUserLogged.set(newStatus);
  }
}
