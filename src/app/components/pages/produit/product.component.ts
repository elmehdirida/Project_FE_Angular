import {Component, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {CartProduct} from "../../../Model/CartProduct";
import {CommentService} from "../../../services/CommentService.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-produit',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements  OnInit{
  constructor(private route :ActivatedRoute) {

  }

  cartCount: number = 0;
  private sub!: Subscription;
  product!: Product;
  comments : Comment[] = [];
  isLoaded: boolean = false;
  image : string= "https://picsum.photos/200/300";
  ngOnInit(): void {

    const navigationState = window.history.state;
    if (navigationState && navigationState.product) {
      const product = navigationState.product;
      console.log("i m here ")
      // Faites quelque chose avec l'objet product, par exemple, affichez ses détails
      console.log(product);
    }
  }
  addToCart(product: Product) {

  }


}
