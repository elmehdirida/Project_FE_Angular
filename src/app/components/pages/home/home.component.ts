import {Component, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServiceService} from "../../../services/auth/auth-service.service";
import {LocalStorageService} from "../../../services/Storage/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {CartComponent} from "../../dialogs/cart/cart.component";
import {CartProduct} from "../../../Model/CartProduct";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cartCount: number = 0;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoginIn: boolean = false ;
  cartItems: CartProduct[] = [];
  searchQuery: String="";
  isLoaded: boolean = false;

  constructor(private productService : ProductService,
              private router: Router,
              private authService : AuthServiceService,
              private route : ActivatedRoute,
              private localStorageService: LocalStorageService,
              public dialog: MatDialog
  ) {
    this.isLoginIn = this.localStorageService.isUserLoggedIn();
  if (this.isLoginIn) {
    this.cartItems = this.localStorageService.getCartStorage();
    this.setNewCartCount();
  }
    this.getProducts();
  }

  getProducts() {
    this.isLoaded = true;
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response.data;
      this.filteredProducts = this.products;
      this.isLoaded = false;
    });
  }

  setNewCartCount() {
    this.cartCount = this.localStorageService.getCartCount();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.localStorageService.setIsUserLoggedIn(false);
        this.localStorageService.removeUserStorage();
        this.localStorageService.removeCartStorage();
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
    let cartProduct = this.cartItems.find((item) => item.product.id == product.id);
    if (cartProduct) {
      cartProduct.quantity++;
    } else {
      this.cartCount++;
      this.cartItems.push({product: product, quantity: 1,id:this.cartCount});
    }
      this.localStorageService.setCartStorage(this.cartItems);
      this.localStorageService.setCartCount(this.cartCount);
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

    openCartDialog() {
      this.dialog.open(CartComponent, {
        maxHeight: '90vh',
        maxWidth: '80vw',
        width:"70vw",
        height:"50vh"
      });
      this.dialog.afterAllClosed.subscribe(() => {
          this.afterClosed()
      }
      );
    }
    afterClosed() {
      this.cartItems = this.localStorageService.getCartStorage();
      this.setNewCartCount();
    }

  clearSearch() {
    this.searchQuery="";
    this.getProducts();
  }

  SearchForProduct() {
    if(this.searchQuery=="") {
      this.getProducts();
    }
    else {
      this.filteredProducts = this.products.filter((product) => {
          return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
      );
    }
  }
}
