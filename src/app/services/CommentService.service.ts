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

    getComments(id: number | undefined) {
    return this.httpClient.get(`${this.ApiUrl}/products/${id}/comments`);
  }
  save(comment:any){
    return this.httpClient.post(`${this.ApiUrl}/comments`,comment);
  }
}
