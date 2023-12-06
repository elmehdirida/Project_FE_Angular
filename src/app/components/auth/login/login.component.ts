import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../../services/auth/auth-service.service";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SessionStorageService} from "../../../services/Storage/session-storage.service";

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
  isLoginIn: boolean = false ;
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(this.email,[Validators.required]),
    password:new FormControl(this.password,[Validators.required]),
    rememberMe:new FormControl(false)
  });

  constructor(private authService: AuthServiceService,
              private router: Router,
              private sessionStorageService: SessionStorageService,)
  {}

  ngOnInit(): void {
    this.isLoginIn = this.sessionStorageService.isUserLoggedIn();
    if (this.isLoginIn) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (this.loginForm.valid){
      this.isLoading = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.sessionStorageService.setIsUserLoggedIn(true);
            this.sessionStorageService.setUserStorage(res);
            this.loginErrors = [];
            this.isLoading = false;
            this.router.navigate(['/home'],
            );
          }
        },
        error: (error) => {
            this.loginErrors = error.error.errors;
            this.isLoading = false;
            this.sessionStorageService.setIsUserLoggedIn(false);
            this.sessionStorageService.removeUserStorage();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();

    }

  }

  reset() {

  }

}
