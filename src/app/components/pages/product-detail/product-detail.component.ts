import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Commentiare} from "../../../Model/Commentiare";
import {MatDialog} from "@angular/material/dialog";
import {CommentComponent} from "../comment/comment.component";
import {CommentService} from "../../../services/CommentService.service";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-file-loader";

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
    private cdr: ChangeDetectorRef
  ) {
    this.Init()
    this.loadComments();
  }
  Init(): void {
    const navigationState = window.history.state;
    if (navigationState && navigationState.product) {
      const productParams = navigationState.product;
      this.product= navigationState.product;

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
  loadComments() {
    if (this.product && this.product.id) {
      this.serviceComment.getComments(this.product.id).subscribe((res : any) => {
          this.comments = res.data;
        }
        , error => {
          console.error("Erreur lors du chargement des commentaires :", error);
        });
    }
    else {
      console.error("pas de product id ");

    }
  }
  openPopupComment() {
     var _popup=this.dialog.open(CommentComponent,{
       width:'60%',
       enterAnimationDuration :'300ms',
       exitAnimationDuration : '500ms',
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
