import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CartProduct} from "../../../Model/CartProduct";
import {MatTableDataSource} from "@angular/material/table";
import {LocalStorageService} from "../../../services/Storage/local-storage.service";
import {OrderProductService} from "../../../services/order-product.service";
import {OrderServiceService} from "../../../services/order-service.service";
import {Router} from "@angular/router";
import {PaymentDialogComponent} from "../payment-dialog/payment-dialog.component";
import {Order} from "../../../Model/Order";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private  orderProductService: OrderProductService,
    private orderService: OrderServiceService,
    private router: Router,
    private dialog: MatDialog
    ,
    private _snackBar: MatSnackBar
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
    this.localStorageService.setCartCount(this.cartItems.length);
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
      this.total += this.calculateProductPriceByDiscount(item.product) * item.quantity;
    });

  }


checkout() {
    if (this.localStorageService.isUserLoggedIn()) {
      let order = {
        order_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        total_amount: this.total,
        order_status: "pending",
        user_id: this.localStorageService.getUser().id
      }
      this.orderService.createOrder(order).subscribe((data: any) => {
          let count = 0;
          this.cartItems.forEach((item) => {
            let orderProduct = {
              order_id: data.data.id,
              product_id: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
              total: item.product.price * item.quantity
            }
            count++;
            this.orderProductService.createOrderProduct(orderProduct).subscribe((data: any) => {
              },
              (error: any) => {
                console.log(error);
              }
            )
          })
          if (count == this.cartItems.length) {
            this.localStorageService.removeCartStorage();
            this.localStorageService.setCartCount(0);
            this.openPaymentDialog(data.data);
            this._snackBar.open('Order Placed Successfully', 'Close', {
              duration: 3000
            });
            } else {
            this._snackBar.open('Order Failed', 'Close', {
              duration: 3000
            });
          }
          this.dialogRef.close();
        },
        (error: any) => {
        this._snackBar.open('Order Failed', 'Close', {
          duration: 3000
        });
          if (error.status == 401) {
            this.localStorageService.setIsUserLoggedIn(false);
            this.localStorageService.removeUserStorage();
            this.localStorageService.deleteToken();
            this.localStorageService.removeCartStorage();
            this.router.navigate(['/login']);
        }
          console.log(error);
        }
      )
    } else {
      //redirect to login
      this.dialogRef.close();
      this.router.navigate(['/login']);

    }
}
  onNoClick() {
    this.dialogRef.close();
  }



  calculateProductPriceByDiscount(product: any) {
    if (product.discount?.discount != 0 && product.discount?.discount != null) {
      return product.price - (product.price * product.discount.discount / 100);
    } else {
      return product.price;
    }
  }


  openPaymentDialog(data:Order) {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      data: data,
      width: "50vw",
      height: "60vh"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
