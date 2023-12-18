import {Component, Inject} from '@angular/core';
import {User} from "../../../Model/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserServiceService} from "../../../services/user-service.service";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  user! : User;
  userForm:FormGroup=new FormGroup({
    email:new FormControl(this.data.email,[Validators.required , Validators.email]),
    name:new FormControl(this.data.name,[Validators.required]),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              public dialog: MatDialogRef<EditUserDialogComponent>,
              private userService : UserServiceService
              ) {
    this.user = data;
  }

  saveChanges() {
    if(this.userForm.valid) {
      let user = this.userForm.value;
      user.id = this.user.id;
      this.userService.updateUser(user).subscribe((data: any) => {
          this.dialog.close(true);
        },
        (error) => {
          if(error.error.email){
            this.userForm.controls['email'].setErrors({'emailExists': true});
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
