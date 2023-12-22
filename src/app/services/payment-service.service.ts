import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl ='http://localhost:8000/api';

  getPayments(){
    return this.httpClient.get(`${this.apiUrl}/payments`);
  }
  getPayment(id :number){
    return this.httpClient.get(`${this.apiUrl}/payments/${id}`);
  }
  createPayment(payment :any){
    return this.httpClient.post(`${this.apiUrl}/payment`,payment);
  }
  updatePayment(id :number,payment :any){
    return this.httpClient.put(`${this.apiUrl}/payments/${id}`,payment);
  }
  deletePayment(id :number){
    return this.httpClient.delete(`${this.apiUrl}/payments/${id}`);
  }
}
