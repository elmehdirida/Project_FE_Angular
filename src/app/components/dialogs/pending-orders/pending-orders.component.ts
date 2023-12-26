import {Component, Inject} from '@angular/core';
import {Order} from "../../../Model/Order";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ShowProductsOrderDialogComponent} from "../show-products-order-dialog/show-products-order-dialog.component";
import {OrderServiceService} from "../../../services/order-service.service";
import {LocalStorageService} from "../../../services/Storage/local-storage.service";
import {PaymentDialogComponent} from "../payment-dialog/payment-dialog.component";

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent {
  orders: Order[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Order[],
              public dialog: MatDialog,
              private orderService : OrderServiceService,
              private localStorageService : LocalStorageService,

              ) {
    console.log(data);
    this.orders = data;
  }

  ViewList(order: Order) {
      const dialogRef =this.dialog.open(ShowProductsOrderDialogComponent, {
        width: '600px',
        maxHeight: '90vh',
        data: order
      });
  }

  DeleteOrder(order: Order) {
    let id = order.id;
    this.orderService.deleteOrder(order.id).subscribe((data: any)=>{
        if (data.status === 'success') {
        this.orders = this.orders.filter((order) => order.id !== id);
        this.localStorageService.setPendingOrdersStorage(this.orders);
      }
    },(error)=>{
        console.log(error);
    }
    )

  }

  PayOrder(order: Order) {
    let ref = this.dialog.open(PaymentDialogComponent, {
      width: '600px',
      maxHeight: '90vh',
      data: order
    })
    ref.afterClosed().subscribe(() => {
      this.localStorageService.refreshPendingOrders();
    });
  }
}
