import { Injectable } from '@angular/core';
import {CartProduct} from "../../Model/CartProduct";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setUserStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUserStorage() {
    return JSON.parse(localStorage.getItem('user')!);
  }
  removeUserStorage() {
    localStorage.removeItem('user');
  }

  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('isLoggedIn')!);
  }
  setIsUserLoggedIn(isLoggedIn: boolean) {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }

  setCartStorage(cartItems: CartProduct[]) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  getCartStorage() {
    return JSON.parse(localStorage.getItem('cart')!) || [];
  }
  removeCartStorage() {
    localStorage.removeItem('cart');
  }

  getCartCount() {
    return this.getCartStorage().length;
  }

  setCartCount(length: number) {
    localStorage.setItem('cartCount', JSON.stringify(length));
  }
}
