import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../Model/User";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiUrl ='http://localhost:8000/api';
constructor(private httpClient : HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post(`${this.apiUrl}/login`, {"email":email,"password": password});
  }
  logout() {
    return this.httpClient.post(`${this.apiUrl}/logout`, {});
  }

  register(user: User) {
    return this.httpClient.post(`${this.apiUrl}/user`, user);
  }
}
