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
  discount : Discount;
  discountForm:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {discount: Discount, mode: string},
              public dialog: MatDialogRef<EditDiscountDialogComponent>,
              private discountService : DiscountServiceService,
  ) {
    if(this.data.mode === 'edit') {
      this.discount = data.discount;
      this.discountForm = new FormGroup({
        id: new FormControl(this.data.discount.id),
        code: new FormControl(this.data.discount.code, [Validators.required]),
        start_date: new FormControl(new Date(this.data.discount.start_date), [Validators.required]),
        end_date: new FormControl(new Date(this.data.discount.end_date), [Validators.required]),
        discount: new FormControl(this.data.discount.discount, [Validators.required]),
      });
    } else{
      this.discount = {
        code: '',
        start_date: new Date(),
        end_date: new Date(),
        discount: 0,
      };
      this.discountForm = new FormGroup({
        code: new FormControl('', [Validators.required]),
        start_date: new FormControl('', [Validators.required]),
        end_date: new FormControl('', [Validators.required]),
        discount: new FormControl('', [Validators.required]),
      });
    }
  }


  saveChanges() {
    console.log(this.discountForm.value);
    if (this.discountForm.valid) {
      let discount = this.discountForm.value;
      discount.start_date = discount.start_date.toISOString().slice(0,10);
      discount.end_date = discount.end_date.toISOString().slice(0,10);
      if (this.data.mode === 'edit') {
        discount.id = this.data.discount.id;
        this.discountService.updateDiscount(discount).subscribe((data: any) => {
          this.dialog.close(true);
        })
      }
      else if (this.data.mode === 'add') {
        this.discountService.addDiscount(discount).subscribe((data: any) => {
          this.dialog.close(true);
        })
      }
    }
  }

  closeEditDialog() {
    this.dialog.close(false);
  }
}
