import { Component } from '@angular/core';
import {LocalStorageService} from "../../../services/Storage/local-storage.service";

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent {

  constructor(
    private localStorageService: LocalStorageService,
  ) {

  }

  pay() {
    this.localStorageService.cartItems$.subscribe(cartItems => {
      this.localStorageService.setCartStorage([]);
      this.localStorageService.setCartCount(0);
    });

    window.location.reload();

    alert("Payment successful")

  }
}
