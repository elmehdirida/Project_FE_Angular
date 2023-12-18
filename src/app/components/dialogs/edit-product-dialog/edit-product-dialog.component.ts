import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../services/product.service";
import {Category} from "../../../Model/Category";
import {CategoryServiceService} from "../../../services/category-service.service";
import {Discount} from "../../../Model/Discount";
import {DiscountServiceService} from "../../../services/discount-service.service";

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent {
  product! : Product;
  productForm:FormGroup=new FormGroup({
    name:new FormControl(this.data.name,[Validators.required]),
    price:new FormControl(this.data.price,[Validators.required]),
    category:new FormControl(this.data.category!.id,[Validators.required]),
    discount:new FormControl(this.data.discount!.id,[Validators.required]),
    image:new FormControl(this.data.image,[Validators.required]),
    description:new FormControl(this.data.description,[Validators.required]),
  });
  categories: Category[] = [];
  discounts :Discount[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
              public dialog: MatDialogRef<EditProductDialogComponent>,
              private productService : ProductService,
              private categoryService : CategoryServiceService,
              private discountService : DiscountServiceService
  ) {
    this.product = data;
    this.getCategories();
    this.getDiscounts();
  }

  saveChanges() {
    if(this.productForm.valid) {
      this.product.name = this.productForm.controls['name'].value;
      this.product.price = this.productForm.controls['price'].value;
      this.product.discount_id = this.productForm.controls["discount"].value;
      this.product.category_id = this.productForm.controls["category"].value;
      this.product.image = this.productForm.controls['image'].value;
      this.product.description = this.productForm.controls['description'].value;
      this.productService.updateProduct(this.product).subscribe((data: any) => {
        this.dialog.close(true);
      });
    }
  }
  getCategories(){
    this.categoryService.getCategories().subscribe((data: any)=>{
        this.categories = data.data;
      }
    )
}
  getDiscounts(){
    this.discountService.getDiscounts().subscribe((data: any)=>{
        this.discounts = data.data;
      }
    )
  }
  closeEditDialog() {
    this.dialog.close(false);
  }
}
