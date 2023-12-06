import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiUrl ='http://localhost:8000/api';
constructor(private httpClient : HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post(`${this.apiUrl}/login`, {"email":email,"password": password});
  }
}
