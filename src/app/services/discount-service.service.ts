import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Discount} from "../Model/Discount";

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
  updateDiscount(discount : Discount){
    return this.httpClient.put(`${this.apiUrl}/discounts/${discount.id}`, discount);
  }

  deleteDiscount(id: number | undefined){
    return this.httpClient.delete(`${this.apiUrl}/discounts/${id}`);
  }

  addDiscount(discount: Discount) {
    return this.httpClient.post(`${this.apiUrl}/discount`, discount);

  }
}
