import { Injectable } from '@angular/core';
import {CartProduct} from "../../Model/CartProduct";
import {BehaviorSubject} from "rxjs";
import {User} from "../../Model/User";
import {Order} from "../../Model/Order";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private cartItemsSource = new BehaviorSubject<CartProduct[]>(this.getCartStorage());
  cartItems$ = this.cartItemsSource.asObservable();
  private pendingOrdersSource = new BehaviorSubject<Order[]>(this.getPendingOrdersCount());
  pendingOrders$ = this.pendingOrdersSource.asObservable();

  setCartStorage(cartItems: CartProduct[]) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.cartItemsSource.next(cartItems); // Notify subscribers
  }

  setPendingOrdersStorage(pendingOrders: Order[]) {
    localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
    this.pendingOrdersSource.next(pendingOrders); // Notify subscribers
  }


  refreshCartItems() {
    const currentCartItems = this.getCartStorage();
    this.cartItemsSource.next(currentCartItems);
  }

  refreshPendingOrders() {
    const currentPendingOrders = this.getPendingOrdersStorage();
    this.pendingOrdersSource.next(currentPendingOrders);
  }


  getCartStorage() : CartProduct[] {
    return JSON.parse(localStorage.getItem('cart')!) || [];
  }

  getPendingOrdersStorage() {
    return JSON.parse(localStorage.getItem('pendingOrders')!) || [];
  }

  removeCartStorage() {
    localStorage.removeItem('cart');
    this.cartItemsSource.next([]);
  }

  getCartCount() {
    return this.getCartStorage().length;
  }

  getPendingOrdersCount() {
    return this.getPendingOrdersStorage().length;
  }

  removePendingOrdersStorage() {
    localStorage.removeItem('pendingOrders');
    this.pendingOrdersSource.next([]);
  }

  setCartCount(length: number) {
    localStorage.setItem('cartCount', JSON.stringify(length));
  }

  setPendingOrdersCount(length: number) {

    localStorage.setItem('pendingOrdersCount', JSON.stringify(length));

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
