import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {ProduitComponent} from "./components/pages/produit/produit.component";

const routes: Routes = [
  {
    "path": "product",
    component: ProduitComponent
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
    "path" : "product", component: ProduitComponent
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
