import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Order} from "../../../Model/Order";
import {OrderProductService} from "../../../services/order-product.service";
import {CartProduct} from "../../../Model/CartProduct";
import {ProductService} from "../../../services/product.service";
import {Discount} from "../../../Model/Discount";

@Component({
  selector: 'app-show-products-order-dialog',
  templateUrl: './show-products-order-dialog.component.html',
  styleUrls: ['./show-products-order-dialog.component.scss']
})
export class ShowProductsOrderDialogComponent {
  order!: Order;
  productOrders: CartProduct[] = [];
  count: number = -1;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Order,
              private orderProductService: OrderProductService,
              private ProductService: ProductService
              ) {
    this.order = data;
    this.getProducts();
  }
  private getProducts() {
    this.count = 0;
    this.orderProductService.getOrderProduct(this.order.id).subscribe((data: any)=>{
       this.productOrders = data.data;
        this.productOrders.forEach((productOrder)=>{
          this.ProductService.getProduct(productOrder.product_id).subscribe((data: any)=>{
            productOrder.product = data.data;
            this.count++;
          })
        })
    },(error)=>{
      console.log(error);
    })
  }

  getDiscountedPrice(price: number, discount: number | undefined) {
    if (discount) {
      return price - (price * discount / 100);
    }
    return price;

  }
}
