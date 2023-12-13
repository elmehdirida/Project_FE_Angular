import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiscountServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl ='http://localhost:8000/api';

  getDiscounts(){
    return this.httpClient.get(`${this.apiUrl}/discounts`);
  }
  getDiscount(id : number){
    return this.httpClient.get(`${this.apiUrl}/discounts/${id}`);
  }
  createDiscount(data : any){
    return this.httpClient.post(`${this.apiUrl}/discounts`, data);
  }
  updateDiscount(id : number, data : any){
    return this.httpClient.put(`${this.apiUrl}/discounts/${id}`, data);
  }
  deleteDiscount(id : number){
    return this.httpClient.delete(`${this.apiUrl}/discounts/${id}`);
  }
}
