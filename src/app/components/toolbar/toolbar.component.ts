import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthServiceService} from "../../services/auth/auth-service.service";
import {LocalStorageService} from "../../services/Storage/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {CartComponent} from "../dialogs/cart/cart.component";
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {CartServiceService} from "../../services/cart-service.service";
import {Order} from "../../Model/Order";
import {OrderServiceService} from "../../services/order-service.service";
import {User} from "../../Model/User";
import {PendingOrdersComponent} from "../dialogs/pending-orders/pending-orders.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  cartCount: number = 0;
  pendingOrdersCount: number = 0;
  isLoginIn: boolean = false;
  pendingOrders: Order[] = [];
  user: User ;
  @Input() isHome: boolean = false;
  @ViewChild('drawer') drawer!: MatSidenav;


  constructor(
    private authService: AuthServiceService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private router: Router,
    private cartService: CartServiceService,
    private orderService: OrderServiceService
  ) {
    this.user = this.localStorageService.getUser();
    this.isLoginIn = this.localStorageService.isUserLoggedIn();
    if (this.isLoginIn){
      this.orderService.getOrdersByUserId(this.user.id).subscribe((res:any) => {
        this.localStorageService.setPendingOrdersStorage(res);
      });
    }

    this.setNewCartCount();

    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count;
    });

    this.localStorageService.pendingOrders$.subscribe(pendingOrders => {
        console.log(pendingOrders);
        this.pendingOrders = pendingOrders;
        this.pendingOrdersCount = pendingOrders.length;
      }
    );

    this.localStorageService.cartItems$.subscribe(cartItems => {
      this.cartCount = cartItems.length;
    });
  }

  ngOnInit() {



  }

  setNewCartCount() {
    this.cartCount = this.localStorageService.getCartCount();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.localStorageService.setIsUserLoggedIn(false);
        this.localStorageService.removeUserStorage();
        this.localStorageService.deleteToken();
        this.localStorageService.removeCartStorage();
        this.localStorageService.clearStorage();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openCartDialog() {
    this.dialog.open(CartComponent, {
      minWidth: "50vw",
      height: "60vh"
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


  openPendingOrdersDialog() {
    this.dialog.open(PendingOrdersComponent, {
      width: "50vw",
      maxHeight: "60vh",
      data: this.pendingOrders
    });
  }
}
