import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Discount} from "../../../Model/Discount";
import {DiscountServiceService} from "../../../services/discount-service.service";

@Component({
  selector: 'app-edit-discount-dialog',
  templateUrl: './edit-discount-dialog.component.html',
  styleUrls: ['./edit-discount-dialog.component.scss']
})
export class EditDiscountDialogComponent {
  discounts: Discount[] = [];
  discountForm:FormGroup=new FormGroup({
    code:new FormControl(this.data.code,[Validators.required]),
    discount:new FormControl(this.data.discount,[Validators.required]),
    start_date:new FormControl(this.data.start_date,[Validators.required]),
    end_date:new FormControl(this.data.end_date,[Validators.required]),

  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: Discount,
              public dialog: MatDialogRef<EditDiscountDialogComponent>,
              private discountService : DiscountServiceService,
  ) {
  }


  saveChanges() {
    if (this.discountForm.valid) {
      let discount = this.discountForm.value;
      discount.start_date = discount.start_date.toISOString().slice(0,10);
      discount.end_date = discount.end_date.toISOString().slice(0,10);
      discount.id = this.data.id;
      this.discountService.updateDiscount(discount.id, discount).subscribe((data: any) => {
          this.dialog.close(true);
        },
        (error) => {
            console.log(error)
        }
      )
    }
  }

  closeEditDialog() {
    this.dialog.close(false);
  }
}
