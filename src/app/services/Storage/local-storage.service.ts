import { Injectable } from '@angular/core';
import {CartProduct} from "../../Model/CartProduct";
import {BehaviorSubject} from "rxjs";
import {User} from "../../Model/User";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private cartItemsSource = new BehaviorSubject<CartProduct[]>(this.getCartStorage());
  cartItems$ = this.cartItemsSource.asObservable();

  setCartStorage(cartItems: CartProduct[]) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.cartItemsSource.next(cartItems); // Notify subscribers
  }

  refreshCartItems() {
    const currentCartItems = this.getCartStorage();
    this.cartItemsSource.next(currentCartItems);
  }

  getCartStorage() {
    return JSON.parse(localStorage.getItem('cart')!) || [];
  }
  removeCartStorage() {
    localStorage.removeItem('cart');
    this.cartItemsSource.next([]);
  }

  getCartCount() {
    return this.getCartStorage().length;
  }

  setCartCount(length: number) {
    localStorage.setItem('cartCount', JSON.stringify(length));
  }
  clearStorage() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  setIsUserLoggedIn(b: boolean) {
    localStorage.setItem('isUserLoggedIn', JSON.stringify(b));
  }

  removeUserStorage() {
    localStorage.removeItem('user');
  }

  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('isUserLoggedIn')!);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  setUserStorage(user : User) {
    localStorage.setItem('user', JSON.stringify(user));

  }

  setToken(token:string) {
    localStorage.setItem('token', token);
  }
}
