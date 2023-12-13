import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {ProductComponent} from "./components/pages/produit/product.component";

const routes: Routes = [
  {
    "path": "product",
    component: ProductComponent
  },
  {
    "path": "login",
    component: LoginComponent
  },
  {
    "path": "register",
    component: RegisterComponent
  },
  {
    "path": "home", component: HomeComponent
  },
  {
    "path" : "product", component: ProductComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
