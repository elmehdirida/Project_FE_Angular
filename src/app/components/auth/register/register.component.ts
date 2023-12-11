import { Component } from '@angular/core';
import {AuthServiceService} from "../../../services/auth/auth-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../Model/User";
import {ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isLoggedIn = false;
  user! : User;
  registerErrors: any = [];
    registerForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    });



  public constructor( private authService:AuthServiceService, private router:Router, private snackBar: MatSnackBar) {
  }

  onSubmit() {
    console.log("mosine", this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        if (error.status === 422) {
          if (this.isValidationErrors(error.error)) {
            const validationErrors = error.error as ValidationErrors;

            const firstError = Object.values(validationErrors)[0][0];

            this.snackBar.open(firstError, 'Close', { duration: 3000 });
          }
        } else {
          console.error('An error occurred:', error);
          this.snackBar.open('An error occurred. Please try again later.', 'Close', { duration: 3000 });
        }
      },
    });
  }

  private isValidationErrors(obj: any): obj is ValidationErrors {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
  }



}
