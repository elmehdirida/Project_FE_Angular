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
  product : Product;
  productForm:FormGroup;
  categories: Category[] = [];
  discounts :Discount[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product, mode: string},
              public dialog: MatDialogRef<EditProductDialogComponent>,
              private productService : ProductService,
              private categoryService : CategoryServiceService,
              private discountService : DiscountServiceService
  ) {
    if(this.data.mode === 'edit') {
      this.product = data.product;
      this.productForm = new FormGroup({
        id: new FormControl(this.product.id),
        name: new FormControl(this.product.name, [Validators.required]),
        price: new FormControl(this.product.price, [Validators.required]),
        category: new FormControl(this.product.category_id, [Validators.required]),
        discount: new FormControl(this.product.discount_id, [Validators.required]),
        image: new FormControl(this.product.image, [Validators.required]),
        description: new FormControl(this.product.description, [Validators.required]),
        stock: new FormControl(this.product.stock, [Validators.required]),
      });
    } else{
      this.product = {
        stock: 0,
        name: '',
        price: 0,
        image: '',
        description: '',
        discount_id: 0,
        category_id: 0,
        rating: 0
      };
      this.productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        discount: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        stock: new FormControl('', [Validators.required]),
      });
    }
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
    this.product.stock = this.productForm.controls['stock'].value;

    if (this.data.mode === 'edit') {
      this.productService.updateProduct(this.product).subscribe((data: any) => {
        this.dialog.close(true);
      });
    } else if (this.data.mode === 'add') {
      this.productService.addProduct(this.product).subscribe((data: any) => {
        this.dialog.close(true);
      });
    }
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
