import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../Model/Product";
import {FormBuilder} from "@angular/forms";
import {CommentService} from "../../../services/CommentService.service";
import {Commentiare} from "../../../Model/Commentiare";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements  OnInit{
  productDetail? : Product;
  closeMessage='close';
  newComment! : Commentiare;
     constructor(private ref:MatDialogRef<CommentComponent>,
                 @Inject(MAT_DIALOG_DATA) public data:any,
                 private build:FormBuilder,
                 private service:CommentService) {
     }
  send() {
     this.ref.close()
  }

  ngOnInit(): void {
       this.productDetail=this.data.product;
       console.log(this.productDetail?.id)
  }
  form=this.build.group({
    email : this.build.control(''),
    text : this.build.control(''),
    rating : this.build.control(''),
    user_id : 2,
    product_id : this.productDetail?.id,
    name : "outman"
  })
   closePop(result:any){
    this.ref.close(result)
   }
  saveComment() {
       console.log(this.form.value);
       this.form.value.product_id=this.productDetail?.id
       this.service.save(this.form.value).subscribe(res =>{
         this.closePop(this.form.value);
       },
         error => {
         console.log("erreur ")
         console.log(error)
         }
      );
  }
}
