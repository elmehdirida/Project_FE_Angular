import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, CanActivate} from "@angular/router";
import {Product} from "../Model/Product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  apiUrl ='http://localhost:8000/api';
  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/products`);
  }

  getProduct(id: number) {
    return this.httpClient.get(`${this.apiUrl}/products/${id}`);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(product: Product) {
    return this.httpClient.put(`${this.apiUrl}/products/${product.id}`, product);

  }

  addProduct(product: Product) {
    return this.httpClient.post(`${this.apiUrl}/product`, product);
  }
}
