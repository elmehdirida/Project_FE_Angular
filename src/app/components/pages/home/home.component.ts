import { Component } from '@angular/core';
import {Product} from "../../../Model/Product";
import {Router} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cartCount: number = 0;
  products: Product[] = [];
  cartItems: Product[] = [];
  constructor( private router: Router) {}

  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        image:
          'https://tse1.mm.bing.net/th?id=OIP.HOyerJYOiyY6ST_3u5_cEQHaKG&pid=Api&P=0&h=180',
        name: 'Shirt',
        price: 900,
        description: 'This is a shirt',
      },
      {
        id: 2,
        image:
          'https://tse2.mm.bing.net/th?id=OIP.M_AbSCyBCyDAmGJs8I84rwHaIi&pid=Api&P=0&h=180',
        name: 'Shirt',
        price: 950,
        description: 'This is a shirt',
      },
      {
        id: 3,
        image:
          'https://tse2.mm.bing.net/th?id=OIP.QcvuIGy-g7D1gNQIFs2SYwHaHa&pid=Api&P=0&h=180',
        name: 'Shoes',
        price: 2000,
        description: 'This is a shirt',
      },

      {
        id: 4,
        image:
          'https://tse3.mm.bing.net/th?id=OIP.QiRoY1nHAre9SdxlwiV_CwHaHa&pid=Api&P=0&h=180',
        name: 'Flat shoe',
        price: 850,
        description: 'This is a shirt',

      },
      {
        id: 5,
        image:
          'https://tse3.mm.bing.net/th?id=OIP.aScmNKvgyfFOzka82xREXQHaHa&pid=Api&P=0&h=180',
        name: 'Shoes',
        price: 1150,
        description: 'This is a shirt',
      },
      {
        id: 6,
        image:
          'https://tse3.mm.bing.net/th?id=OIP.GSd6xdL2Qeq7Q7ptmm533AHaHa&pid=Api&P=0&h=180',
        name: 'Titan Watch',
        price: 8650,
        description: 'This is a shirt',

      }
    ];
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
}
