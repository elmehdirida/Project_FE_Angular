import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../Model/Product";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Commentiare} from "../../../Model/Commentiare";
import {MatDialog} from "@angular/material/dialog";
import {CommentService} from "../../../services/CommentService.service";
import {ProductService} from "../../../services/product.service";
import {LocalStorageService} from "../../../services/Storage/local-storage.service";
import {CartComponent} from "../../dialogs/cart/cart.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  @ViewChild('stepper') stepper: MatStepper | undefined;
  cartCount: number = 0;
  private sub!: Subscription;
  product!: Product;
  comments : Commentiare[] = [];
  isLogin: boolean = false;
  isLoaded: boolean = false;
  firstFormGroup: FormGroup;
  userRating: any = 0;
  all: number=0;
  constructor(
    private route: ActivatedRoute,
    private dialog:MatDialog,
    private serviceComment:CommentService,
    private cdr: ChangeDetectorRef,
    private productService:ProductService,
    private localstorage:LocalStorageService,
    private _snackBar: MatSnackBar
  ) {
    this.isLogin = this.localstorage.isUserLoggedIn();
    this.firstFormGroup = new FormGroup({
      'comment' : new FormControl("",[Validators.required]),
    });
  }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productService.getProduct(id).subscribe((data: any) => {
          this.product = data.data;
          console.log(this.product);
          this.isLoaded = true;
          this.comments = this.product.comments!;
          this.comments.reverse();
          this.cdr.detectChanges();

        });
      }
    });
  }

  addToCart() {
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

  checkout() {
    this.dialog.open(CartComponent,{
      width:'60%',
      enterAnimationDuration :'300ms',
    });

  }

  onRatingChanged($event: number) {
    this.userRating=$event;
  }

  addComment() {
    let comment = {
      text: this.firstFormGroup.controls['comment'].value,
      rating: this.userRating,
      user_id: this.localstorage.getUser().id,
      product_id: this.product.id,
      user: this.localstorage.getUser()
    };
    if(this.firstFormGroup.valid){

    this.serviceComment.save(comment).subscribe((data:any)=>{
      this.product.rating = (this.product.rating * this.product.comments!.length + this.userRating) / (this.product.comments!.length + 1);
      this.productService.updateProduct(this.product).subscribe((data:any)=>{
          })
      this.comments.push(data.data);
      this.product.comments = this.comments;
      this.firstFormGroup.reset();
      this.userRating = 0;
      this.loadData()
      this.all = 0;
      this.cdr.detectChanges();
      this.stepper?.reset()

    })
  }else{
      this._snackBar.open('Please enter a comment', 'close', {
        duration: 2000,
      });
    }
  }
}
