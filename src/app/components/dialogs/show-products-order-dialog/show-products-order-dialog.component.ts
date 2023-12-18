import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Order} from "../../../Model/Order";

@Component({
  selector: 'app-show-products-order-dialog',
  templateUrl: './show-products-order-dialog.component.html',
  styleUrls: ['./show-products-order-dialog.component.scss']
})
export class ShowProductsOrderDialogComponent {
  order!: Order;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Order) {
    this.order = data;
  }

}
