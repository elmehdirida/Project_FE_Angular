import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, CanActivate} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  apiUrl ='http://localhost:8000/api';
  constructor(private httpClient:HttpClient) { }

  getProducts(){
    return this.httpClient.get(`${this.apiUrl}/products`);
  }



}
