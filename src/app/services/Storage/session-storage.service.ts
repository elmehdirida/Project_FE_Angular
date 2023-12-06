import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor(
  ) { }

  // User Storage

  setUserStorage(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  getUserStorage() {
    return JSON.parse(sessionStorage.getItem('user')!);
  }
  removeUserStorage() {
    sessionStorage.removeItem('user');
  }

  isUserLoggedIn() {
    return JSON.parse(sessionStorage.getItem('isLoggedIn')!);
  }
  setIsUserLoggedIn(isLoggedIn: boolean) {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }

}
