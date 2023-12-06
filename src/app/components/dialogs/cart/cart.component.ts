import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../Model/Product";
import {CartProduct} from "../../../Model/CartProduct";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {LocalStorageService} from "../../../services/Storage/local-storage.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent{
  cartItems: CartProduct[] = [];
  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    private  localStorageService: LocalStorageService,
  ) {
    this.cartItems = this.localStorageService.getCartStorage();
    this.calcTotalCost(this.cartItems);
    this.dataSource = new MatTableDataSource(this.cartItems);
  }


  total: number = 0;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'delete'];
  dataSource!: MatTableDataSource<CartProduct>;


  deleteItemCart(index: number) {
    this.cartItems.splice(index, 1);
    this.calcTotalCost(this.cartItems);
    this.localStorageService.setCartStorage(this.cartItems);
    this.dataSource = new MatTableDataSource(this.cartItems);
  }

  addQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.calcTotalCost(this.cartItems);
    this.localStorageService.setCartStorage(this.cartItems);
  }

  removeQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.calcTotalCost(this.cartItems);
      this.localStorageService.setCartStorage(this.cartItems);
    }else {
      this.deleteItemCart(index);
      this.calcTotalCost(this.cartItems);
      this.localStorageService.setCartStorage(this.cartItems);
    }
  }


  calcTotalCost(cartItems: CartProduct[]) {
    this.total = 0;
    cartItems.forEach((item) => {
      this.total += item.product.price * item.quantity;
    });

  }

  checkout() {

  }

  onNoClick() {
    this.dialogRef.close();
  }
}
