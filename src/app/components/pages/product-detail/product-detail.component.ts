import {Component, OnInit} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Commentiare} from "../../../Model/Commentiare";
import {MatDialog} from "@angular/material/dialog";
import {CommentComponent} from "../comment/comment.component";
import {CommentService} from "../../../services/CommentService.service";

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
  //newComment? : Commentiare;
  newComment: Commentiare = {
    id: 0,
    text: '',
    product_id: 0,
    user: { id: 0, email: '', password: '', confirmPassword: '', name: 'OUTM' },
    date: null,
    rating: 0,
    name: ''
  };

  isLoaded: boolean = false;
  image : string="" ;
  showadd: boolean = true;
  showremove: boolean = false;
  constructor(
    //private api: ApiService,
    private route: ActivatedRoute,private dialog:MatDialog,
    private serviceComment:CommentService) {

  }
  ngOnInit(): void {

    const navigationState = window.history.state;
    if (navigationState && navigationState.product) {
      const productParams = navigationState.product;
      this.product= navigationState.product;
      this.comments=productParams.comment

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
  loadComments(comment:Commentiare){
    this.serviceComment.getComments(this.product.id).subscribe(res =>{
      this.comments=res
      console.log("***** les commentaires *******")
      console.log(this.comments);
    });
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
       this.loadComments(item);
     })
  }
}
