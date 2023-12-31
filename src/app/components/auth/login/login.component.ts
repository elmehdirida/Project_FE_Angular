import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../../services/auth/auth-service.service";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../../services/Storage/local-storage.service";

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
              private localStorageService: LocalStorageService,)
  {}

  ngOnInit(): void {
    this.isLoginIn = this.localStorageService.isUserLoggedIn();
    if (this.isLoginIn) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (this.loginForm.valid){
      this.isLoading = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (res:any) => {
          if (res) {
            this.localStorageService.setIsUserLoggedIn(true);
            this.localStorageService.setUserStorage(res.user);
            this.localStorageService.setToken(res.token);
            this.loginErrors = [];
            this.isLoading = false;
            if(res.role== 'admin'){
              this.authService.setAdmin(true);
            }
            this.router.navigate(['/home'],
            );
          }
        },
        error: (error) => {
          console.log(error.error);
            this.loginErrors = error.error;
            this.isLoading = false;
            this.localStorageService.setIsUserLoggedIn(false);
            this.localStorageService.removeUserStorage();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();

    }

  }

  register() {
    this.router.navigate(['/register']);
  }

}
