import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Commentiare} from "../../../Model/Commentiare";
import {MatDialog} from "@angular/material/dialog";
import {CommentComponent} from "../comment/comment.component";
import {CommentService} from "../../../services/CommentService.service";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-file-loader";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  cartCount: number = 0;
  private sub!: Subscription;
  product!: Product;
  comments : Commentiare[] = [];

  isLoaded: boolean = false;
  image : string="" ;
  showadd: boolean = true;
  showremove: boolean = false;
  constructor(
    private route: ActivatedRoute,private dialog:MatDialog,
    private serviceComment:CommentService,
    private cdr: ChangeDetectorRef,
    private productService:ProductService
  ) {
    this.Init()
    this.loadInitComments();
  }
  Init(): void {
    const navigationState = window.history.state;
    if (navigationState && navigationState.product) {
      this.product= navigationState.product;

    }
  }
  addtocart() {
    this.showadd = false;
    this.showremove = true;
   // this.api.addtocart(productdata)
  }
  Handle(event:number){
    alert(`hello  ${event}`)
  }
  removeitem() {
    //this.showadd = true;
    //this.showremove = false;
    //this.api.removecartitem(productdata)
  }
  loadInitComments(){
    this.serviceComment.getComments(this.product.id).subscribe((res : any) => {
        this.comments = res.data;
      }
      , error => {
        console.error("Erreur lors du chargement des commentaires :", error);
      });
  }

  loadComments() {
    if (this.product && this.product.id) {
      var ratingPr=0;
      this.serviceComment.getComments(this.product.id).subscribe((res : any) => {
          this.comments = res.data;
          // mis a jour Product
          console.log("rating product mis a jours ")
          this.comments.forEach(comment=>{
            ratingPr=ratingPr+comment.rating;
            console.log(ratingPr)
          });
        ratingPr=ratingPr/this.comments.length;
        console.log("fine : ",ratingPr);
          let rest = ratingPr % 1;
          if (rest >= 0.5) {
            ratingPr = Math.ceil(ratingPr); // Si supérieur à 0.5, arrondir vers le haut
          } else {
            ratingPr = Math.floor(ratingPr); // Sinon, arrondir vers le bas
          }
          console.log("Nouvelle valeur de rating :", ratingPr);
          this.product.rating=ratingPr;
          this.updateProductRating(this.product);

        }
        , error => {
          console.error("Erreur lors du chargement des commentaires :", error);
        });

    }
    else {
      console.error("pas de product id ");
    }
  }
  updateProductRating(product:Product){
    this.productService.updateProduct(product).subscribe((data: any) =>{
      console.log("**** rating modified in database :  ",this.product);
  });
  }
  openPopupComment() {
     var _popup=this.dialog.open(CommentComponent,{
       width:'60%',
       enterAnimationDuration :'300ms',
       data : {
         product : this.product
       }
     });
     _popup.afterClosed().subscribe(item=>{
       console.log("after close");
        console.log(item)
       this.loadComments();
     })
  }

}
