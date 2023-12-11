import { Component } from '@angular/core';
import {Product} from "../../../Model/Product";
import {CartProduct} from "../../../Model/CartProduct";
import {CommentService} from "../../../services/CommentService.service";

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent {
  constructor(private commentService : CommentService) {
    this.getComments()
  }
  cartCount: number = 0;
  product!: Product;
  comments : Comment[] = [];
  isLoaded: boolean = false;
  image : string= "https://picsum.photos/200/300";
  addToCart(product: Product) {

  }
  getComments() {
    this.isLoaded = true;
    this.commentService.getComments(3).subscribe((response: any) => {
      console.log("i m here ")

      this.comments = response.data;
      console.log(this.comments);
      this.isLoaded = false;
    });
  }
}
