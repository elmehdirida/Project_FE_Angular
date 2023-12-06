import {Component, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServiceService} from "../../../services/auth/auth-service.service";
import {SessionStorageService} from "../../../services/Storage/session-storage.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  cartCount: number = 0;
  products: Product[] = [];
  isLoginIn: boolean = false ;

  constructor(private productService : ProductService,
              private router: Router,
              private authService : AuthServiceService,
              private route : ActivatedRoute,
              private sessionStorageService: SessionStorageService
  ) {}
  cartItems: Product[] = [];

  ngOnInit(): void {
    this.isLoginIn = this.sessionStorageService.isUserLoggedIn();
    this.getProducts();
      }

  getProducts() {
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response.data;
    });
  }


  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.sessionStorageService.setIsUserLoggedIn(false);
        this.sessionStorageService.removeUserStorage();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  login() {
          this.router.navigate(['/login']);
        }

  addToCart(product: Product) {
    this.cartCount = this.cartCount + 1 ;
    this.cartItems.push(product);
  }

  register() {
    this.router.navigate(['/register']);
  }

  getDiscount(product: Product): number {
    if(product.discount?.discount!=0 && product.discount?.discount!=null) {
      return product.price - (product.price * product.discount.discount / 100);
    }
    else {
      return product.price;
    }

  }
}
