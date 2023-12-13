import {Component, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {CartProduct} from "../../../Model/CartProduct";
import {CommentService} from "../../../services/CommentService.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Commentiare} from "../../../Model/Commentiare";

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
  comments : Commentiare[] = [];
  isLoaded: boolean = false;
  ngOnInit(): void {

    const navigationState = window.history.state;
    if (navigationState && navigationState.product) {
      const product = navigationState.product;
      this.comments=product.comment
      console.log("comments ");
      console.log(this.comments)
      console.log("i m here ")
      console.log(product.image);
    }

  }
  addToCart(product: Product) {
  }
}
