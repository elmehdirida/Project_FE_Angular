import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../Model/Order";

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
  updateOrder( data : Order){
    return this.httpClient.put(`${this.apiUrl}/orders/${data.id}`, data);
  }
  deleteOrder(id : number){
    return this.httpClient.delete(`${this.apiUrl}/orders/${id}`);
  }
  createOrder(data : any){
    return this.httpClient.post(`${this.apiUrl}/order`, data);
  }

  getOrdersByUserId(id : number){
    return this.httpClient.get(`${this.apiUrl}/users/${id}/orders`);
  }

}
