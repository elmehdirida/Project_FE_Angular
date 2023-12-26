import {Component, Inject} from '@angular/core';
import {LocalStorageService} from "../../../services/Storage/local-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Order} from "../../../Model/Order";
import {PaymentServiceService} from "../../../services/payment-service.service";
import {Payment} from "../../../Model/Payment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderServiceService} from "../../../services/order-service.service";
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent {
  paymentForm: FormGroup;
  totalAmount: number = 0;
  selected: string = 'Visa';
  paymentOptions: string[] = ['PayPal' ,'Visa', 'MasterCard']

  constructor(
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private paymentService: PaymentServiceService,
    private ordersService: OrderServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.totalAmount = data.total_amount;
    this.paymentForm = new FormGroup({
      'cardNumber': new FormControl('1234 1234 1234 1234'),
      'user': new FormControl(this.localStorageService.getUser().name),
      'expiry': new FormControl('2029/12'),
      'cvc': new FormControl('123'),
      'option': new FormControl('Visa'),
    });

  }

// ...

pay() {
  let payment: Payment = {
    amount: this.totalAmount,
    order_id: this.data.id,
    payment_method: this.selected,
    payment_status: 'processing'
  }
  this.paymentService.createPayment(payment).subscribe(() => {
    this.localStorageService.cartItems$.pipe(take(1)).subscribe(cartItems => {
      this.localStorageService.setCartStorage([]);
      this.localStorageService.setCartCount(0);
    });
    let order = this.data;
    order.order_status = 'processing';
    this.ordersService.updateOrder(order).subscribe((res) => {
      console.log('updateOrder successful');
    }, error => {
      console.log('updateOrder error', error);
      this._snackBar.open('Payment Failed', 'Close', {
        duration: 3000
      });
    });
    this._snackBar.open('Payment Successful', 'Close', {
      duration: 3000
    });
    this.dialog.closeAll();
  }, error => {
    console.log('createPayment error', error);
    this._snackBar.open('Payment Failed', 'Close', {
      duration: 3000
    });
    this.dialog.closeAll();
  });
}
}
