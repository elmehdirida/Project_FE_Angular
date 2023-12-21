import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl ='http://localhost:8000/api';
  getOrders(){
    return this.httpClient.get(`${this.apiUrl}/orders`);
  }
  getOrder(id : number){
    return this.httpClient.get(`${this.apiUrl}/orders/${id}`);
  }
  updateOrder(id : number, data : any){
    return this.httpClient.put(`${this.apiUrl}/orders/${id}`, data);
  }
  deleteOrder(id : number){
    return this.httpClient.delete(`${this.apiUrl}/orders/${id}`);
  }
  createOrder(data : any){
    return this.httpClient.post(`${this.apiUrl}/order`, data);
  }

}
