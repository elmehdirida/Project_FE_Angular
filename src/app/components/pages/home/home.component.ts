import { Component } from '@angular/core';
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cartCount: number = 0;
  products: Product[] = [];

  constructor(private productService : ProductService,private router: Router) {}
  cartItems: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
      }

  getProducts() {
    this.productService.getProducts().subscribe((response: any) => {
      console.log(response);
      this.products = response.data;
    });
  }


  logout() {

  }
  login() {
          this.router.navigate(['/login']);
        }




  addToCart(product: Product) {
    this.cartCount = this.cartCount + 1 ;
    this.cartItems.push(product);
    console.log(this.cartItems)
  }

  register() {
    this.router.navigate(['/register']);
  }

  getDiscount(product: Product): number {
    if(product.discount?.discount!=0 && product.discount?.discount!=null) {
      return product.price * product.discount.discount / 100;
    }
    else {
      return product.price;
    }

  }
}
