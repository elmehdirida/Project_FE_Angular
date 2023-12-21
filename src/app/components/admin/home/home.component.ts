import { Component, OnInit} from '@angular/core';
import {User} from "../../../Model/User";
import {Order} from "../../../Model/Order";
import {Product} from "../../../Model/Product";
import {Payment} from "../../../Model/Payment";
import {Discount} from "../../../Model/Discount";
import {Category} from "../../../Model/Category";
import {UserServiceService} from "../../../services/user-service.service";
import {OrderServiceService} from "../../../services/order-service.service";
import {ProductService} from "../../../services/product.service";
import {CategoryServiceService} from "../../../services/category-service.service";
import {DiscountServiceService} from "../../../services/discount-service.service";
import {PaymentServiceService} from "../../../services/payment-service.service";
import {OrderProductService} from "../../../services/order-product.service";
import {CartProduct} from "../../../Model/CartProduct";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  users: User[]= [];
  orders: Order[] = [];
  products: Product[] = [];
  categories: Category[] = [];
  discounts: Discount[] = [];
  payments: Payment[] = [];
  orderProducts : CartProduct[] = [];
  Top5Products : CartProduct[] = [];
  ProductIdAndCount : any[] = [];
  isLoaded: boolean = false;
  //create a map that handel 4 status of order and count of them
  orderStatusCount : any[] = [];
  paymentStatusCount : any[] = [];
  totalSales : number = 0;
  totalPayments : number = 0;
  constructor(private userService : UserServiceService,
              private orderService : OrderServiceService,
              private productService : ProductService,
              private categoryService : CategoryServiceService,
              private discountService : DiscountServiceService,
              private paymentService : PaymentServiceService,
              private orderProductService : OrderProductService
              ) {
  }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    // Use forkJoin to combine multiple observables
    forkJoin([
      this.userService.getUsers(),
      this.orderProductService.getOrderProducts(),
      this.orderService.getOrders(),
      this.productService.getProducts(),
      this.categoryService.getCategories(),
      this.discountService.getDiscounts(),
      this.paymentService.getPayments()
    ]).subscribe(
      (responses: any[]) => {
        this.users = responses[0].data;
        this.orderProducts = responses[1].data;
        this.orders = responses[2].data;
        this.products = responses[3].data;
        this.categories = responses[4].data;
        this.discounts = responses[5].data;
        this.payments = responses[6].data;
        this.getTop5Products();
        this.getOrdersCount();
        this.getPaymentStatusCount();
        this.getTotalSales();
        this.getTotalPayments();
        },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  statusColors(order:string) {
    if(order == "processing"){
      return "back-yellow"
    }else if(order == "completed"){
      return "back-green"
    }else if(order == "declined"){
      return "back-red"
    }
    else{
      return "back-blue"
    }
  }
  getTotalSales() {
    this.orders.forEach((item)=>{
      this.totalSales += +item.total_amount as number;
    })
  }

  getTotalPayments() {
    this.payments.forEach((item)=>{
      if (item.payment_status == "completed"){
        this.totalPayments += +item.amount as number;
      }
    })
  }
  getOrdersCount(){
    this.orderStatusCount.push({status: "completed", count: this.orders.filter((item)=>item.order_status == "completed").length});
    this.orderStatusCount.push({status: "processing", count: this.orders.filter((item)=>item.order_status == "processing").length});
    this.orderStatusCount.push({status: "pending", count: this.orders.filter((item)=>item.order_status == "pending").length});
    this.orderStatusCount.push({status: "declined", count: this.orders.filter((item)=>item.order_status == "declined").length});
  }

  getPaymentStatusCount(){
    this.paymentStatusCount.push({status: "processing", count: this.payments.filter((item)=>item.payment_status == "processing").length});
    this.paymentStatusCount.push({status: "completed", count: this.payments.filter((item)=>item.payment_status == "completed").length});
    this.paymentStatusCount.push({status: "pending", count: this.payments.filter((item)=>item.payment_status == "pending").length});
    this.paymentStatusCount.push({status: "declined", count: this.payments.filter((item)=>item.payment_status == "declined").length});
  }
  getTop5Products(){
    this.orderProducts.forEach((orderProduct)=>{
      let index = this.ProductIdAndCount.findIndex((item)=>item.productId == orderProduct.product_id);
      if(index == -1){
        this.ProductIdAndCount.push({productId: orderProduct.product_id, count: 1});
      }else{
        this.ProductIdAndCount[index].count += 1;
      }
    });
    this.ProductIdAndCount.sort((a,b)=>b.count-a.count);
      for(let i = 0; i < 5; i++) {
      this.Top5Products.push(<CartProduct>this.orderProducts.find((item) => item.product_id == this.ProductIdAndCount[i].productId));
    }

    for(let i = 0; i < 5; i++) {
      this.productService.getProduct(this.Top5Products[i].product_id).subscribe((response : any)=>{
        this.Top5Products[i].product = response.data;
        if(i == 4){
          this.isLoaded = true;
        }
      }
      );
    }
  }
}
