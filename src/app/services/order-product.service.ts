import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  constructor(private http : HttpClient) { }
  apiUrl ='http://localhost:8000/api';
  getOrderProducts(){
    return this.http.get(`${this.apiUrl}/orderproducts`);
  }
  getOrderProduct(id : number){
    return this.http.get(`${this.apiUrl}/orderproducts/${id}`);
  }
  updateOrderProduct(id : number, data : any){
    return this.http.put(`${this.apiUrl}/orderproducts/${id}`, data);
  }
  deleteOrderProduct(id : number){
    return this.http.delete(`${this.apiUrl}/orderproducts/${id}`);
  }
  createOrderProduct(data : any){
    return this.http.post(`${this.apiUrl}/orderproduct`, data);
  }
}
