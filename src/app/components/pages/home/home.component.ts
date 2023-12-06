import { Component } from '@angular/core';
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;

}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cartCount: number = 0;
  products: Product[] = [];

  constructor() {}

  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        image:
          'https://tse1.mm.bing.net/th?id=OIP.HOyerJYOiyY6ST_3u5_cEQHaKG&pid=Api&P=0&h=180',
        name: 'Shirt',
        price: 900,
      },
      {
        id: 2,
        image:
          'https://tse2.mm.bing.net/th?id=OIP.M_AbSCyBCyDAmGJs8I84rwHaIi&pid=Api&P=0&h=180',
        name: 'Shirt',
        price: 950,
      },
      {
        id: 3,
        image:
          'https://tse2.mm.bing.net/th?id=OIP.QcvuIGy-g7D1gNQIFs2SYwHaHa&pid=Api&P=0&h=180',
        name: 'Shoes',
        price: 2000,
      },
      {
        id: 4,
        image:
          'https://tse3.mm.bing.net/th?id=OIP.QiRoY1nHAre9SdxlwiV_CwHaHa&pid=Api&P=0&h=180',
        name: 'Flat shoe',
        price: 850,
      },
      {
        id: 5,
        image:
          'https://tse3.mm.bing.net/th?id=OIP.aScmNKvgyfFOzka82xREXQHaHa&pid=Api&P=0&h=180',
        name: 'Shoes',
        price: 1150,
      },
      {
        id: 6,
        image:
          'https://tse3.mm.bing.net/th?id=OIP.GSd6xdL2Qeq7Q7ptmm533AHaHa&pid=Api&P=0&h=180',
        name: 'Titan Watch',
        price: 8650,
      }
    ];
  }



  logout() {

  }



  addToCart(product: Product) {

  }
}
