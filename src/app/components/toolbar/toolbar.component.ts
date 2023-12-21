import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthServiceService} from "../../services/auth/auth-service.service";
import {LocalStorageService} from "../../services/Storage/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {CartComponent} from "../dialogs/cart/cart.component";
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {CartServiceService} from "../../services/cart-service.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  cartCount: number = 0;
  isLoginIn: boolean = false;
  @Input() isHome: boolean = false;
  @ViewChild('drawer') drawer!: MatSidenav;


  constructor(
    private authService: AuthServiceService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private router: Router,
    private cartService: CartServiceService,
  ) {}

  ngOnInit() {
    this.isLoginIn = this.localStorageService.isUserLoggedIn();
    this.setNewCartCount();

    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count;
    });

    this.localStorageService.cartItems$.subscribe(cartItems => {
      this.cartCount = cartItems.length;
    });
  }

  setNewCartCount() {
    this.cartCount = this.localStorageService.getCartCount();
  }

  logout() {
    this.localStorageService.clearStorage();
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
    this.localStorageService.refreshCartItems(); // Call a method to refresh cart items in HomeComponent
  }



  toggleSidenav() {
    this.drawer.toggle();
  }
  onToggleSidenav() {
    this.cartService.toggleSidenav();
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }



}
