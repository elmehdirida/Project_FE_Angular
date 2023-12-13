import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  apiUrl ='http://localhost:8000/api';
  constructor(private httpClient : HttpClient) { }

  getUsers(){
    return this.httpClient.get(`${this.apiUrl}/users`);
  }
  updateUser(id : number, data : any){
    return this.httpClient.put(`${this.apiUrl}/users/${id}`, data);
  }
  deleteUser(id : number){
    return this.httpClient.delete(`${this.apiUrl}/users/${id}`);
  }
  getUser(id : number){
    return this.httpClient.get(`${this.apiUrl}/users/${id}`);
  }
}
