import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    RouterLink,
  ]
})
export class AuthModule { }
