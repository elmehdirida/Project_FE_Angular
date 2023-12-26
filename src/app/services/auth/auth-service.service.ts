import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../Model/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isAdmin: boolean = false;
  apiUrl ='http://localhost:8000/api';
constructor(private httpClient : HttpClient) { }

  login(email: string, password: string): Observable<any> {
  console.log(email);
    return this.httpClient.post<User>(`${this.apiUrl}/login`, {"email":email,"password": password});
  }
  logout() {
    return this.httpClient.post(`${this.apiUrl}/logout`, {});
  }

  register(user: User) {
    user.role = 'admin';
    return this.httpClient.post(`${this.apiUrl}/register`, user);
  }

  setAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }
  getAdmin() {
    return this.isAdmin;
  }
}
