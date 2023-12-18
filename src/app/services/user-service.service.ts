import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../Model/User";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  apiUrl ='http://localhost:8000/api';
  constructor(private httpClient : HttpClient) { }

  getUsers(){
    return this.httpClient.get(`${this.apiUrl}/users`);
  }
  updateUser( data : User){
    return this.httpClient.put(`${this.apiUrl}/users/${data.id}`, data);
  }
  deleteUser(id : number){
    return this.httpClient.delete(`${this.apiUrl}/users/${id}`);
  }
  getUser(id : number){
    return this.httpClient.get(`${this.apiUrl}/users/${id}`);
  }
}
