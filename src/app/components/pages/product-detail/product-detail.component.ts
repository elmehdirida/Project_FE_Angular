import {Component, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Commentiare} from "../../../Model/Commentiare";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{


  cartCount: number = 0;
  private sub!: Subscription;
  product!: Product;
  comments : Commentiare[] = [];
  isLoaded: boolean = false;
  image : string="" ;
  showadd: boolean = true;
  showremove: boolean = false;
  constructor(
    //private api: ApiService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {

    const navigationState = window.history.state;
    if (navigationState && navigationState.product) {
      const productParams = navigationState.product;
      this.product= navigationState.product;
      this.comments=productParams.comment
      console.log("comments ");
      console.log(this.comments)
      console.log("i m here ")
      console.log(this.product);
    }
  }
  addtocart() {
    this.showadd = false;
    this.showremove = true;
   // this.api.addtocart(productdata)
  }

  removeitem() {
    //this.showadd = true;
    //this.showremove = false;
    //this.api.removecartitem(productdata)
  }

}
