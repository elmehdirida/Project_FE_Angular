import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServiceService} from "../../../services/auth/auth-service.service";
import {LocalStorageService} from "../../../services/Storage/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {CartComponent} from "../../dialogs/cart/cart.component";
import {CartProduct} from "../../../Model/CartProduct";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Category} from "../../../Model/Category";
import {CategoryServiceService} from "../../../services/category-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  @ViewChild('toolbar', {read: ElementRef}) toolbar!: ElementRef;
  toolbarHeight: number = 80;

  cartCount: number = 0;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoginIn: boolean = false;
  cartItems: CartProduct[] = [];
  searchQuery: String = "";
  isLoaded: boolean = false;
  par: string = ""
  isHandset: boolean = false;
  categories: Category[] = [];
  selectedCategory: number | null = null;
  minDiscountValue: number = 0;
  maxDiscountValue: number = 100;
  minPrice: number = 0;
  maxPrice: number = 1000;

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 805px)'])
      .subscribe(result => {
        this.isHandset = result.matches;
        if (this.isHandset) {
          // Close sidenav when switching to handset mode
          this.drawer.close();
        }
      });

    this.calculateToolbarHeight();
    this.getCategories();


  }

  constructor(private productService: ProductService,
              private categoryService: CategoryServiceService,
              private router: Router,
              private authService: AuthServiceService,
              private route: ActivatedRoute,
              private localStorageService: LocalStorageService,
              public dialog: MatDialog,
              private breakpointObserver: BreakpointObserver
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
      console.log("mosine", this.filteredProducts);
      this.isLoaded = false;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response.data;
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
      this.cartItems.push({product: product, quantity: 1, id: this.cartCount});
    }
    this.localStorageService.setCartStorage(this.cartItems);
    this.localStorageService.setCartCount(this.cartCount);
  }

  register() {
    this.router.navigate(['/register']);
  }

  getDiscount(product: Product): number {
    if (product.discount?.discount != 0 && product.discount?.discount != null) {
      return product.price - (product.price * product.discount.discount / 100);
    } else {
      return product.price;
    }
  }

  openCartDialog() {
    this.dialog.open(CartComponent, {
      maxHeight: '90vh',
      maxWidth: '80vw',
      width: "70vw",
      height: "50vh"
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
    this.searchQuery = "";
    this.getProducts();
  }

  SearchForProduct() {
    if (this.searchQuery == "") {
      this.getProducts();
    } else {
      this.filteredProducts = this.products.filter((product) => {
          return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
      );
    }
  }

  consulteProduct(product: Product) {
    console.log("in consulte **** ")
    console.log(product)
    this.router.navigate(["/product"], {
      state: {product: product, par: this.par}
    });

  }

  toggleSidenav() {
    this.drawer.toggle();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.calculateToolbarHeight();
  }

  calculateToolbarHeight() {
    setTimeout(() => {
      this.toolbarHeight = this.toolbar.nativeElement.clientHeight;
      if (this.drawer) {
        this.drawer.fixedTopGap = this.toolbarHeight;
      }
    });
  }




  /*filterProductsByDiscountRange() {
    this.filteredProducts = this.products.filter(product => {
      const discountValue = product.discount ? product.discount.discount : 0;
      return discountValue >= this.minDiscountValue && discountValue <= this.maxDiscountValue;
    });
  }


  filterProductsByPrice() {
    this.filteredProducts = this.products.filter(product => {
      const price = product.price ? (product.price - (product.price*product.discount!.discount/100)) : 0;
      console.log("price1", price)
      console.log("price2", (product.price - (product.price*product.discount!.discount/100)))
      return price >= this.minPrice && price <= this.maxPrice;
    });
  }

  filterProductsByCategory() {
    if (this.selectedCategory) {
      console.log("Selected Category ID:", this.selectedCategory);
      this.filteredProducts = this.products.filter(product => {
        if (product.category) {
          console.log("Product Category ID:", product.category.id);
          return product.category.id === this.selectedCategory;
        }
        return false;
      });
    } else {
      this.filteredProducts = this.products;
    }
  }*/



  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const discountValue = product.discount ? product.discount.discount : 0;
      const price = product.price ? (product.price - (product.price * product.discount!.discount / 100)) : 0;
      const matchesDiscount = discountValue >= this.minDiscountValue && discountValue <= this.maxDiscountValue;
      const matchesPrice = price >= this.minPrice && price <= this.maxPrice;
      const matchesCategory = !this.selectedCategory || (product.category && product.category.id === this.selectedCategory);

      return matchesDiscount && matchesPrice && matchesCategory;
    });
  }

  // Call this method whenever a filter value changes
  onFilterChange() {
    this.applyFilters();
  }






}


