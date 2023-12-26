import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../Model/Product";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentService} from "../../../services/CommentService.service";
import {Commentiare} from "../../../Model/Commentiare";
import {LocalStorageService} from "../../../services/Storage/local-storage.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements  OnInit{
  productDetail? : Product;
  closeMessage='close';
  ratingProduct=0;
     constructor(private ref:MatDialogRef<CommentComponent>,
                 @Inject(MAT_DIALOG_DATA) public data:any,
                 private build:FormBuilder,
                 private service:CommentService,
                 private local:LocalStorageService) {
     }
  send() {
     this.ref.close()
  }

  ngOnInit(): void {
       this.productDetail=this.data.product;
       console.log(this.productDetail?.id)
  }
  form=this.build.group({
    text : this.build.control('',[Validators.required]),
    rating : this.ratingProduct,
    user_id : this.local.getUser().id,
    product_id : this.productDetail?.id,
  })
   closePop(result:any){
    this.ref.close(result)
   }
  saveComment() {
       console.log(this.form.value);
       this.form.value.product_id=this.productDetail?.id
       this.form.value.rating=this.ratingProduct;
       if(this.form.valid){
         this.service.save(this.form.value).subscribe(res =>{
             this.closePop(this.form.value);
           },
           error => {
             console.log(error)
           }
         );
       }
  }
  Handle(event:number){
       this.ratingProduct=event;
  }
}
