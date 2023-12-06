import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl ='http://localhost:8000/api';
  constructor(private httpClient:HttpClient) { }

  getProducts(){
    return this.httpClient.get(`${this.apiUrl}/products`);
  }
}
