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
import {LocalStorageService} from "../../../services/Storage/local-storage.service";
import {CartComponent} from "../../dialogs/cart/cart.component";

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
    private route: ActivatedRoute,
    private dialog:MatDialog,
    private serviceComment:CommentService,
    private cdr: ChangeDetectorRef,
    private productService:ProductService,
    private localstorage:LocalStorageService
  ) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      console.log("id : ",id);
      if (id) {
        this.productService.getProduct(id).subscribe((data: any) => {
          this.product = data.data;
          console.log("product : ",this.product);
          this.isLoaded = true;
          this.comments = this.product.comments!;
        });
      }
    });
  }

  addtocart() {
    let cart = this.localstorage.getCartStorage();
    let item = cart.find((p: any) => p.product_id == this.product.id);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({
        id: cart.length + 1,
        quantity: 1,
        product: this.product,
        product_id: this.product.id!
      });
    }
    this.localstorage.setCartStorage(cart);


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

  checkout() {
    this.dialog.open(CartComponent,{
      width:'60%',
      enterAnimationDuration :'300ms',
    });

  }
}
