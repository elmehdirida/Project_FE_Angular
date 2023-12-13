import {Component, OnInit} from '@angular/core';
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
  constructor(private userService : UserServiceService,
              private orderService : OrderServiceService,
              private productService : ProductService,
              private categoryService : CategoryServiceService,
              private discountService : DiscountServiceService,
              private paymentService : PaymentServiceService
              ) {
  }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData(){
    this.userService.getUsers().subscribe((response : any)=>{
      this.users = response.data;
    });
    this.orderService.getOrders().subscribe((response : any)=>{
      this.orders = response.data;
    });
    this.productService.getProducts().subscribe((response : any)=>{
      this.products = response.data;
    });
    this.categoryService.getCategories().subscribe((response : any)=>{
      this.categories = response.data;
    });
    this.discountService.getDiscounts().subscribe((response : any)=>{
      this.discounts = response.data;
    });
    this.paymentService.getPayments().subscribe((response : any)=>{
      this.payments = response.data;
    });
  }
}
