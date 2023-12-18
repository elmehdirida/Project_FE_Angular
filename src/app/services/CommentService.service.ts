import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Commentiare} from "../Model/Commentiare";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient:HttpClient) { }
  ApiUrl = 'http://localhost:8000/api';

  getComments(id :number):Observable<Commentiare[]> {
    return this.httpClient.get<Commentiare[]>(`${this.ApiUrl}/products/${id}/comments`);
  }
  save(comment:any){
    console.log("any");
    console.log(comment)
    return this.httpClient.post(`${this.ApiUrl}/comments`,comment);
  }
}
