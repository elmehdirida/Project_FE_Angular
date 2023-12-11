import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient:HttpClient) { }
  ApiUrl = 'http://localhost:8000/api';

  getComments(id :number){
    return this.httpClient.get(`${this.ApiUrl}/comments/${id}`);
  }
}
