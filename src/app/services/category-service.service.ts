import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../Model/Category";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl ='http://localhost:8000/api';

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategory(id : number){
    return this.httpClient.get(`${this.apiUrl}/categories/${id}`);
  }
  createCategory(data : any){
    return this.httpClient.post(`${this.apiUrl}/categories`, data);
  }
  updateCategory(id : number, data : any){
    return this.httpClient.put(`${this.apiUrl}/categories/${id}`, data);
  }
  deleteCategory(id : number){
    return this.httpClient.delete(`${this.apiUrl}/categories/${id}`);
  }
}
