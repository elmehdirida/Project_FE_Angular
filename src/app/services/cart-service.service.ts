import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {CartProduct} from "../Model/CartProduct";
import {LocalStorageService} from "./Storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private toggleSidenavSource = new Subject<void>();
  toggleSidenav$ = this.toggleSidenavSource.asObservable();
  private cartCountSource = new BehaviorSubject<number>(0);
  cartCount = this.cartCountSource.asObservable();
  private cartItems: CartProduct[] = [];
  constructor(private localStorage: LocalStorageService) {}

  updateCartCount(count: number) {
    this.localStorage.setCartCount(count);
    this.cartCountSource.next(count);
  }



  toggleSidenav() {
    this.toggleSidenavSource.next();
  }

  updateCartItems(items: CartProduct[]) {
    this.cartItems = items;
    this.localStorage.setCartStorage(items);
    this.updateCartCount(this.cartItems.length);
  }

  refreshCart() {
    this.cartItems = this.localStorage.getCartStorage();
    this.updateCartCount(this.cartItems.length);
  }
}
