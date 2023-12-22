import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CartProduct} from "../../../Model/CartProduct";
import {MatTableDataSource} from "@angular/material/table";
import {LocalStorageService} from "../../../services/Storage/local-storage.service";
import {OrderProductService} from "../../../services/order-product.service";
import {OrderServiceService} from "../../../services/order-service.service";
import {PaymentDialogComponent} from "../payment-dialog/payment-dialog.component";

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
    private dialog: MatDialog
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
  let order = {
    order_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    total_amount: this.total,
    order_status: "pending",
    user_id: this.localStorageService.getUserStorage().id
  }
  this.orderService.createOrder(order).subscribe((data: any) => {
      console.log(data);
      this.cartItems.forEach((item) => {
        let orderProduct = {
          order_id: data.data.id,
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity
        }
        this.orderProductService.createOrderProduct(orderProduct).subscribe((data: any) => {
            console.log(data);
            //clear cart
            this.localStorageService.removeCartStorage();
            this.localStorageService.setCartCount(0);
            this.dialogRef.close();
          },
          (error: any) => {
            console.log(error);
          }
        )
      })
    },
    (error: any) => {
      console.log(error);
    }
  )
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


  openPaymentDialog() {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      maxHeight: '90vh',
      maxWidth: '80vw',
      width: "70vw",
      height: "50vh"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
