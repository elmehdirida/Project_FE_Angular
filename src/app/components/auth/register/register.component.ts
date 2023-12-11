import { Component } from '@angular/core';
import {AuthServiceService} from "../../../services/auth/auth-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../Model/User";

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
    console.log("mosine",this.registerForm.value);



    this.authService.register(this.registerForm.value).subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.registerErrors = [];
          this.isLoggedIn = true;
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.snackBar.open(
          this.registerErrors[0]
          , 'Close', {duration: 3000,})
      }
    });

  }

}
