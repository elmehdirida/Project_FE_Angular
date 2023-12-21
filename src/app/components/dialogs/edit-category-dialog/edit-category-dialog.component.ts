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
  categoryForm:FormGroup;
  category : Category;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {category: Category, mode: string},
              public dialog: MatDialogRef<EditCategoryDialogComponent>,
              private categoryService : CategoryServiceService,
  ) {
    if(this.data.mode === 'edit') {
      this.category = data.category;
      this.categoryForm = new FormGroup({
        id: new FormControl(this.data.category.id),
        name: new FormControl(this.data.category.name, [Validators.required]),
        description: new FormControl(this.data.category.description, [Validators.required]),
      });
    } else{
      this.category = {
        name: '',
        description: '',
      };
      this.categoryForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      });
    }
  }

  saveChanges() {
  if(this.categoryForm.valid){
    this.category.name = this.categoryForm.value.name;
    this.category.description = this.categoryForm.value.description;
    if(this.data.mode === 'edit'){
      this.categoryService.updateCategory(this.category).subscribe((data: any)=>{
        this.dialog.close(true);
      })
    }
    else if (this.data.mode === 'add'){

      this.categoryService.addCategory(this.category).subscribe((data: any)=>{
        this.dialog.close(true);
      })
    }
    }
  }

  closeEditDialog() {
    this.dialog.close(false);
  }

}
