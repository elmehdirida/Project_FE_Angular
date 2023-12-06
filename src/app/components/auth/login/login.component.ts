import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../../services/auth/auth-service.service";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit{
  email = '';
  password = '';
  loginErrors: any = [];
  isLoading = false;
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(this.email,[Validators.required]),
    password:new FormControl(this.password,[Validators.required]),
    rememberMe:new FormControl(false)
  });

  constructor(private authService: AuthServiceService,
              private snackBar: MatSnackBar)
  {}

  ngOnInit(): void {
  }

  login() {
    this.isLoading = true;
    if (this.loginForm.valid){
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (isLoggedIn) => {
          if (isLoggedIn) {
            this.loginErrors = [];
            this.isLoading = false;
            this.snackBar.open('You are logged in', 'Close', {
              duration: 3000,
            });
          }
        },
        error: (error) => {
          this.loginErrors = error.error.errors;
          this.isLoading = false;
          this.snackBar.open(error.error.message, 'Close', {
            duration: 3000,
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();

    }

  }

  reset() {

  }

}
