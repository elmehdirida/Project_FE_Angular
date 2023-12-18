import {Component, Inject} from '@angular/core';
import {Category} from "../../../Model/Category";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryServiceService} from "../../../services/category-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss'],
})
export class EditCategoryDialogComponent {
  categories: Category[] = [];
  categoryForm:FormGroup=new FormGroup({
    description:new FormControl(this.data.description,[Validators.required]),
    name:new FormControl(this.data.name,[Validators.required]),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: Category,
              public dialog: MatDialogRef<EditCategoryDialogComponent>,
              private categoryService : CategoryServiceService,
  ) {
  }

  saveChanges() {
    if(this.categoryForm.valid) {
      let category = this.categoryForm.value;
      category.id = this.data.id;
      this.categoryService.updateCategory(category.id,category).subscribe((data: any) => {
          this.dialog.close(true);
        },
        (error) => {
          if(error.error.name){
            this.categoryForm.controls['name'].setErrors({'nameExists': true});
          }
          else{
            this.dialog.close(false);
          }        }
      )
    }
  }
  closeEditDialog() {
    this.dialog.close(false);
  }

}
